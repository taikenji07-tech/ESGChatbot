
import React, { useState, useMemo } from 'react';
import type { DragDropQuizNode, Language } from './types';
import { translations } from './translations';

interface DragDropQuizProps {
    node: DragDropQuizNode;
    onComplete: (isCorrect: boolean) => void;
    language: Language;
}

type Placements = Record<string, string | null>;

export const DragDropQuiz: React.FC<DragDropQuizProps> = ({ node, onComplete, language }) => {
    const t = (key: string) => translations[language][key] || key;

    const initialPlacements = node.targets.reduce((acc, target) => {
        acc[target.id] = null;
        return acc;
    }, {} as Placements);
    
    const [placements, setPlacements] = useState<Placements>(initialPlacements);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const shuffledItems = useMemo(() => [...node.items].sort(() => Math.random() - 0.5), [node.items]);
    const unplacedItems = shuffledItems.filter(item => !Object.values(placements).includes(item.id));
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
        setDraggedItem(itemId);
        e.dataTransfer.effectAllowed = 'move';
        // Minor visual tweak for the dragged item
        e.currentTarget.style.opacity = '0.6';
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        if (!draggedItem) return;

        // If the item was already placed elsewhere, free up its old spot
        const newPlacements = { ...placements };
        Object.keys(newPlacements).forEach(key => {
            if (newPlacements[key] === draggedItem) {
                newPlacements[key] = null;
            }
        });

        // Place the new item, swapping if necessary
        const existingItemInTarget = newPlacements[targetId];
        newPlacements[targetId] = draggedItem;
        if(existingItemInTarget) {
            const oldTargetKey = Object.keys(placements).find(key => placements[key] === draggedItem);
            if(oldTargetKey) {
                newPlacements[oldTargetKey] = existingItemInTarget;
            }
        }
        
        setPlacements(newPlacements);
        setDraggedItem(null);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleCheckAnswer = () => {
        const isCorrect = node.targets.every(target => placements[target.id] === target.correctItemId);
        onComplete(isCorrect);
    };

    const allPlaced = unplacedItems.length === 0;
    
    const pillarColors: Record<string, string> = {
        E: 'bg-emerald-100 dark:bg-emerald-900 border-emerald-500',
        S: 'bg-sky-100 dark:bg-sky-900 border-sky-500',
        G: 'bg-amber-100 dark:bg-amber-900 border-amber-500',
    }
    
    const itemClasses = "px-4 py-2 rounded-full cursor-grab transition-all duration-150 text-sm font-medium bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm";

    return (
        <div className="mt-4 space-y-6 animate-fade-in-up">
            {/* Unplaced Items Area */}
            <div 
                className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl min-h-[6rem] transition-all"
                onDrop={(e) => handleDrop(e, 'unplaced')}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-wrap gap-2">
                    {unplacedItems.map(item => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragEnd={handleDragEnd}
                            className={itemClasses}
                        >
                            {t(item.textKey)}
                        </div>
                    ))}
                    {unplacedItems.length === 0 && <p className="text-sm text-center w-full text-gray-500 dark:text-gray-400">{t('All items placed!')}</p>}
                </div>
            </div>

            {/* Drop Zones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {node.targets.map(target => {
                    const placedItem = node.items.find(item => item.id === placements[target.id]);
                    return (
                        <div
                            key={target.id}
                            onDrop={(e) => handleDrop(e, target.id)}
                            onDragOver={handleDragOver}
                            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${pillarColors[target.id]} ${draggedItem ? 'border-dashed' : ''} min-h-[8rem] flex flex-col`}
                        >
                            <h3 className="text-2xl font-bold text-center mb-3 text-gray-700 dark:text-gray-200">{target.label}</h3>
                            <div className="flex-grow flex items-center justify-center">
                                {placedItem ? (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, placedItem.id)}
                                        onDragEnd={handleDragEnd}
                                        className={itemClasses}
                                    >
                                        {t(placedItem.textKey)}
                                    </div>
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500 text-sm">{t('Drop here')}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Submit Button */}
            {allPlaced && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleCheckAnswer}
                        className="button-hover bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        {t('btn_check_answer')}
                    </button>
                </div>
            )}
        </div>
    );
};
