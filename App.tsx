import { Analytics } from "@vercel/analytics/next"
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { BackgroundEffects } from './BackgroundEffects';
import { BotIcon, UserIcon, SendIcon } from './Icons';
import { AchievementNotification } from './AchievementNotification';
import { DragDropQuiz } from './DragDropQuiz';
import { decisionTree, achievements, quizOrder, progressNodes, totalProgressSteps } from './constants';
import { translations } from './translations';
import type { Message, NodeId, DecisionTree, Node, Button, GameState, Achievement, LoopQuestionNode, Language, DragDropQuizNode } from './types';
import { getDynamicResponse, translateToMalay } from './geminiService';

const TypingIndicator = () => (
    <div className="flex justify-start animate-slide-in-up">
        <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <BotIcon className="w-5 h-5" />
            </div>
            <div className="bot-bubble chat-bubble rounded-3xl p-5 shadow-xl mr-6">
                <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                </div>
            </div>
        </div>
    </div>
);

const ChatMessage: React.FC<{
    message: Message;
    onOptionClick: (nextNodeId: NodeId, branchKey: string, buttonText: string, type?: 'link' | 'share_linkedin') => void;
    onDragDropQuizComplete: (isCorrect: boolean) => void;
}> = ({ message, onOptionClick, onDragDropQuizComplete }) => {
    const formatMessageContent = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/(\r\n|\n|\r)/gm, '<br/>');
    };

    if (message.sender === 'user') {
        return (
            <div className="flex justify-end animate-slide-in-up">
                <div className="flex items-start gap-4 max-w-4xl flex-row-reverse">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <div className="user-bubble chat-bubble rounded-3xl p-5 shadow-xl ml-6">
                        {message.text}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start animate-slide-in-up">
            <div className="flex items-start gap-4 max-w-4xl">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                    <BotIcon className="w-5 h-5" />
                </div>
                <div className="bot-bubble chat-bubble rounded-3xl p-5 shadow-xl mr-6">
                    <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.text) }} />
                    {message.buttons && (
                        <div className="mt-5 space-y-3 animate-fade-in-up">
                            {message.buttons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={() => onOptionClick(button.nextNode, button.branchKey || '', button.text, button.type)}
                                    className="button-hover block w-full text-left px-4 py-3 rounded-xl shadow-sm border"
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    )}
                    {message.quizData && message.quizData.type === 'QUIZ_DRAG_DROP' && (
                        <DragDropQuiz node={message.quizData} onComplete={onDragDropQuizComplete} language={message.language!} />
                    )}
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const initialGameState: GameState = {
        score: 0,
        streak: 0,
        achievements: new Set(),
        quizCorrectAnswers: 0,
        userName: '',
        major: '',
        lastQuestionId: '',
        visitedProgressNodes: new Set(),
        quizCompleted: false,
    };

    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentNodeId, setCurrentNodeId] = useState<NodeId>('start');
    const [isTyping, setIsTyping] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [visitedLoopBranches, setVisitedLoopBranches] = useState(new Set<string>());
    const [visitedSecondaryBranches, setVisitedSecondaryBranches] = useState<Record<string, Set<string>>>({});
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<Language>('en');
    const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<number | null>(null);
    const dynamicResponseTextRef = useRef<string | null>(null);
    
    const t = (key: string, replacements?: Record<string, string | number>): string => {
        let text = translations[language][key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                text = text.replace(`{${rKey}}`, String(replacements[rKey]));
            });
        }
        return text;
    };

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(scrollToBottom, [messages, isTyping]);
    
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);
    
    const addMessage = (message: Omit<Message, 'id'> & {id?: number}, buttonsToRemoveId?: number) => {
        setMessages(prev => {
            let updatedMessages = prev;
            if (buttonsToRemoveId) {
                updatedMessages = updatedMessages.map(msg => 
                    msg.id === buttonsToRemoveId ? { ...msg, buttons: undefined, quizData: undefined } : msg
                );
            }
            const messageWithLang = { ...message, language };
            return [...updatedMessages, { ...messageWithLang, id: message.id ?? Date.now() + Math.random() }];
        });
    };

    const updateScore = (points: number) => {
        setGameState(prev => {
            if (prev.quizCompleted) return prev;
            return { ...prev, score: prev.score + points };
        });
    };

    const showAchievement = (id: string) => {
        if (gameState.achievements.has(id)) return;
        
        const achievement = achievements[id];
        if (!achievement) return;

        setGameState(prev => {
            const newAchievements = new Set(prev.achievements);
            newAchievements.add(id);
            const scoreToAdd = prev.quizCompleted ? 0 : achievement.points;
            return { ...prev, achievements: newAchievements, score: prev.score + scoreToAdd };
        });
        
        setActiveAchievement(achievement);
        setTimeout(() => setActiveAchievement(null), 3500);
    };
    
    const updateStreak = (isCorrect: boolean) => {
        if (gameState.quizCompleted) return;
        if (isCorrect) {
            const newStreak = gameState.streak + 1;
            const pointsToAdd = 100 + (newStreak > 1 ? 20 : 0);
            updateScore(pointsToAdd);
            setGameState(prev => ({ ...prev, streak: newStreak, quizCorrectAnswers: prev.quizCorrectAnswers + 1 }));

            if (newStreak === 3) {
                showAchievement('streak_3');
            }
        } else {
            setGameState(prev => ({ ...prev, streak: 0 }));
        }
    };
    
    const resetGame = () => {
        setGameState(initialGameState);
        setMessages([]);
        setVisitedLoopBranches(new Set());
        setVisitedSecondaryBranches({});
        setCurrentNodeId('start');
    };

    useEffect(() => {
        if (progressNodes.has(currentNodeId)) {
            setGameState(prev => {
                if (prev.visitedProgressNodes.has(currentNodeId)) {
                    return prev;
                }
                const newVisited = new Set(prev.visitedProgressNodes);
                newVisited.add(currentNodeId);
                return { ...prev, visitedProgressNodes: newVisited };
            });
        }
    }, [currentNodeId]);

    useEffect(() => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
        }

        const node: Node = (decisionTree as DecisionTree)[currentNodeId];
        if (!node) return;

        if (node.type === 'REDIRECT' || node.type === 'REDIRECT_QUIZ') {
            const nextNodeId = node.type === 'REDIRECT' ? node.nextNode : (() => {
                const currentIndex = quizOrder.indexOf(gameState.lastQuestionId);
                return (currentIndex === -1 || currentIndex >= quizOrder.length - 1) 
                    ? 'quiz_end' 
                    : quizOrder[currentIndex + 1];
            })();
            setCurrentNodeId(nextNodeId);
            return;
        }
        
        const typingTimer = setTimeout(() => {
            setIsTyping(false);

            if (node.isCorrect !== undefined) updateStreak(node.isCorrect);
            if (node.achievementId) showAchievement(node.achievementId);
            
            let messageText: string;
            const replacements = {
                userName: gameState.userName,
                score: gameState.score,
                quizCorrectAnswers: gameState.quizCorrectAnswers,
                major: gameState.major
            };
            
            if (node.isDynamic && dynamicResponseTextRef.current) {
                messageText = dynamicResponseTextRef.current
                    .replace(/{userName}/g, gameState.userName)
                    .replace(/{major}/g, gameState.major);
                dynamicResponseTextRef.current = null;
            } else {
                 messageText = t(node.text, replacements);
            }
            
            let messageButtons: Button[] | undefined = undefined;
            let quizData: DragDropQuizNode | undefined = undefined;

            if (node.type === 'QUIZ_DRAG_DROP') {
                quizData = node;
            } else if (node.type === 'LOOP_QUESTION') {
                const isSecondary = !!node.parentLoop;
                const loopKey = isSecondary ? currentNodeId : 'main_loop';
                const visitedSet = isSecondary ? (visitedSecondaryBranches[loopKey] || new Set()) : visitedLoopBranches;
                const remainingBranches = Object.keys(node.branches).filter(key => !visitedSet.has(key));

                if (remainingBranches.length === 0) {
                    setCurrentNodeId(node.nextNode);
                    return;
                }
                
                if (visitedSet.size > 0) {
                    const revisitTextKey = isSecondary ? 'more_importance_esg_revisit_text' : 'main_loop_revisit_text';
                    messageText = t(revisitTextKey, { userName: gameState.userName });
                }
                
                messageButtons = remainingBranches.map(key => ({
                    ...node.branches[key],
                    text: t(node.branches[key].text),
                    branchKey: key
                }));

            } else if ((node.type === 'QUESTION' || node.type === 'ANSWER') && node.buttons) {
                messageButtons = node.buttons.map(btn => ({ ...btn, text: t(btn.text) }));
            }
            
            const messageId = Date.now() + Math.random();
            addMessage({ sender: 'bot', text: ' ', id: messageId });

            let charIndex = 0;
            typingIntervalRef.current = window.setInterval(() => {
                if (charIndex < messageText.length) {
                    setMessages(prev => prev.map(msg => 
                        msg.id === messageId ? { ...msg, text: messageText.substring(0, charIndex + 1) } : msg
                    ));
                    charIndex++;
                } else {
                    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                    
                    setMessages(prev => prev.map(msg => 
                        msg.id === messageId ? { ...msg, buttons: messageButtons, quizData: quizData } : msg
                    ));

                    setInputVisible(node.type === 'PROMPT');
                    if (node.type === 'PROMPT') {
                         setTimeout(() => document.getElementById('user-input')?.focus(), 100);
                    }
                }
            }, 20);

        }, 500);
        
        setIsTyping(true);

        return () => {
            clearTimeout(typingTimer);
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };

    }, [currentNodeId, gameState.quizCompleted, language]);

    const handleOptionClick = (nextNodeId: NodeId, branchKey: string, buttonText: string, type?: 'link' | 'share_linkedin') => {
        const lastMessage = messages[messages.length-1];

        if (type === 'share_linkedin') {
            const shareText = encodeURIComponent(`I just completed the ESG Student Guide by RHB, scoring ${gameState.score} out of 1000 points, and earned a certificate of completion! It's a fantastic interactive way to learn about Environmental, Social, and Governance principles. #ESG #Sustainability #Student #RHBCares #RHB`);
            const url = `https://www.linkedin.com/feed/?shareActive=true&text=${shareText}`;
            window.open(url, '_blank');
            return;
        }

        if (type === 'link') {
            window.open(nextNodeId, '_blank');
            addMessage({ sender: 'user', text: buttonText }, lastMessage.id);
            const newText = t('certificate_claim_info_text');
            addMessage({
                sender: 'bot',
                text: newText,
                buttons: [
                    { text: t('btn_share_score'), nextNode: 'share_action', type: 'share_linkedin' },
                    { text: t('btn_start_over'), nextNode: 'start' }
                ]
            });
            return;
        }

        addMessage({ sender: 'user', text: buttonText }, lastMessage.id);
        
        if (nextNodeId === 'start') {
            resetGame();
            return;
        }
        
        if (nextNodeId === 'quiz_end' && !gameState.quizCompleted) {
            if (gameState.quizCorrectAnswers >= 4) {
                showAchievement('quiz_master');
            }
            setGameState(prev => ({...prev, quizCompleted: true}));
        }

        if (quizOrder.includes(currentNodeId)) {
            setGameState(prev => ({...prev, lastQuestionId: currentNodeId}));
        }

        const previousNode = decisionTree[currentNodeId];
        
        if (previousNode.type === 'LOOP_QUESTION') {
            const topicKey = branchKey;
            const isMainLoop = !previousNode.parentLoop;

            if (isMainLoop) {
                if (!visitedLoopBranches.has(topicKey)) {
                    updateScore(50); // Award points for completing a main topic
                    const newVisited = new Set(visitedLoopBranches).add(topicKey);
                    setVisitedLoopBranches(newVisited);
                    if (newVisited.size === 1) showAchievement('branch_complete');
                    if (newVisited.size === Object.keys((decisionTree['main_loop'] as LoopQuestionNode).branches).length) {
                        showAchievement('all_topics');
                    }
                }
            } else {
                 setVisitedSecondaryBranches(prev => {
                    const newSet = new Set(prev[currentNodeId] || []);
                    newSet.add(branchKey);
                    return {...prev, [currentNodeId]: newSet };
                });
            }
        }
        
        setCurrentNodeId(nextNodeId);
    };

    const handleDragDropQuizComplete = (isCorrect: boolean) => {
        const lastMessage = messages[messages.length - 1];
        addMessage({ sender: 'user', text: t('btn_check_answer') }, lastMessage.id);
        
        setGameState(prev => ({ ...prev, lastQuestionId: 'quiz_q1' }));

        const node = decisionTree['quiz_q1'] as DragDropQuizNode;
        setCurrentNodeId(isCorrect ? node.nextNode : node.incorrectNextNode);
    };
    
    const handlePromptInput = async () => {
        const message = inputValue.trim();
        if (!message) return;

        addMessage({ sender: 'user', text: message });
        const lastNode = decisionTree[currentNodeId];
        
        setInputValue('');
        setInputVisible(false);

        if (lastNode.type !== 'PROMPT') return;
        
        if (currentNodeId === 'start') {
            setGameState(prev => ({...prev, userName: message}));
            showAchievement('first_steps');
        }

        if (quizOrder.includes(currentNodeId)) {
            setGameState(prev => ({ ...prev, lastQuestionId: currentNodeId }));
        }

        if (lastNode.isDynamic) {
             setIsTyping(true);
            try {
                let contextPrompt = "";
                const jsonInstruction = `Your primary task is to determine if the user's response is relevant to the question implicit in the instructions. Then, formulate a helpful response based on the context. Return your output as a JSON object with two keys: 'isRelevant' (boolean) and 'responseText' (string).`;

                if (currentNodeId === 'what_else_student_prompt') {
                    contextPrompt = `You are a friendly and encouraging chatbot helping a student understand ESG. The student was just asked "what else do you think you can do as a student?". The student will provide their idea. If the idea is relevant, validate it positively and briefly expand on it. If the idea is irrelevant (e.g., "I like pizza"), your responseText should be a polite message asking the user to provide an idea related to ESG actions.`;
                } else if (currentNodeId === 'degree_major_prompt') {
                    contextPrompt = `You are a friendly and encouraging chatbot helping a student understand ESG. The student has just been asked for their major. If their answer is a plausible academic major, respond positively and briefly explain in one or two sentences how ESG is relevant to that specific field. **Crucially, when you mention the user's major in your response, wrap it in double asterisks like this: **The Major**.** Use markdown for other emphasis as well. If the answer is not a plausible major (e.g. "I don't know" or "blue"), your responseText should be a friendly message asking them to provide their actual major.`;
                } else if (currentNodeId === 'quiz_q6_prompt') {
                    contextPrompt = `You are a thoughtful and inspiring chatbot concluding a quiz about ESG. The student was asked the open-ended question: "How much do you matter in saving our Earth?". Provide a thoughtful and encouraging response. Acknowledge their perspective and then reinforce the idea that individual actions matter. Keep it concise and uplifting. If the answer is irrelevant, your responseText should gently guide them back to answering the question.`;
                } else if (currentNodeId === 'quiz_q7_prompt') {
                    contextPrompt = `You are an encouraging chatbot concluding a quiz about ESG. The student was asked the open-ended question: "What is one action you will take to improve your ESG impact?". The student will provide their commitment. Provide a positive and affirming response. Acknowledge their commitment and reinforce that it's a great step. If the answer is irrelevant, your responseText should gently ask them to state a concrete action they plan to take.`;
                }

                const systemInstruction = `${contextPrompt} ${jsonInstruction}`;
                const { isRelevant, text: englishText } = await getDynamicResponse(systemInstruction, message);

                let finalResponseText = englishText;
                if (language === 'ms') {
                    finalResponseText = await translateToMalay(englishText);
                }

                if (isRelevant) {
                    if (currentNodeId === 'degree_major_prompt') {
                        setGameState(prev => ({...prev, major: message}));
                    }
                    dynamicResponseTextRef.current = finalResponseText;
                    setCurrentNodeId(lastNode.nextNode);
                } else {
                    addMessage({sender: 'bot', text: finalResponseText});
                    setInputVisible(true);
                }

            } catch (error) {
                console.error("Error processing prompt:", error);
                let errorMessage = "I had a little trouble processing that. Could you please try again?";
                 if (language === 'ms') {
                    errorMessage = await translateToMalay(errorMessage);
                }
                addMessage({ sender: 'bot', text: errorMessage });
                setInputVisible(true);
            } finally {
                setIsTyping(false);
            }
        } else {
             setCurrentNodeId(lastNode.nextNode);
        }
    };

    const progressPercent = totalProgressSteps > 0 ? (gameState.visitedProgressNodes.size / totalProgressSteps) * 100 : 0;

    return (
        <>
            <BackgroundEffects />
            <div className="relative z-10 flex flex-col h-screen">
                <Header 
                    score={gameState.score}
                    streak={gameState.streak}
                    progress={progressPercent}
                    theme={theme}
                    onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    language={language}
                    onLanguageToggle={() => setLanguage(lang => lang === 'en' ? 'ms' : 'en')}
                    t={t}
                />
                 <AchievementNotification achievement={activeAchievement} language={language} />
                <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg) => (
                           <ChatMessage key={msg.id} message={msg} onOptionClick={handleOptionClick} onDragDropQuizComplete={handleDragDropQuizComplete} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                    {inputVisible && (
                        <div className="border-t border-white/20 bg-black/10 backdrop-filter backdrop-blur-lg p-6">
                            <div className="flex gap-4 max-w-4xl mx-auto">
                                <input
                                    id="user-input"
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t('Type your answer here...')}
                                    className="flex-1 px-6 py-4 rounded-2xl border-2 enhanced-input focus:outline-none bg-white/80 border-white/30 text-gray-800 placeholder-gray-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handlePromptInput()}
                                    aria-label="User input"
                                />
                                <button
                                    onClick={handlePromptInput}
                                    className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-2xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    aria-label="Send message"
                                >
                                    <SendIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};
<Analytics />
export default App;
