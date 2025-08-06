
import React from 'react';
import { SparklesIcon, SunIcon, MoonIcon, StarIcon, ZapIcon } from './Icons';
import { Language } from './types';

interface HeaderProps {
    score: number;
    streak: number;
    progress: number;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
    language: Language;
    onLanguageToggle: () => void;
    t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ score, streak, progress, theme, onThemeToggle, language, onLanguageToggle, t }) => {
    return (
        <header className="relative header-bg text-white p-6 shadow-2xl border-b border-white/20 z-10">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg">
                        <SparklesIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{t('header_title')}</h1>
                        <p className="text-blue-100 text-sm mt-1 opacity-90">{t('header_subtitle')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={onLanguageToggle} className="p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 font-bold text-sm w-12">
                        {language === 'en' ? 'MS' : 'EN'}
                    </button>
                    <button onClick={onThemeToggle} className="p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10">
                        {theme === 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                    </button>
                    <a href="https://www.rhbinsurance.com.my/" target="_blank" rel="noopener noreferrer" className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hidden md:block transition-transform duration-300 hover:scale-105">
                        <div className="flex items-center gap-2">
                            <div className="text-blue-600 font-black text-2xl tracking-tight">RHB</div>
                            <div className="w-4 h-4 bg-red-500 ml-1 transform rotate-45"></div>
                        </div>
                        <div className="text-gray-700 text-xs font-medium mt-1">RHB Insurance Berhad</div>
                    </a>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-100">{t('learning_progress')}</span>
                    <div className="flex items-center gap-4">
                        <div className="score-display px-3 py-1 rounded-lg flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{score} {t('points')}</span>
                        </div>
                        {streak > 0 && (
                            <div className="streak-counter px-3 py-1 rounded-lg text-white flex items-center gap-2">
                                <ZapIcon className="w-4 h-4" />
                                <span className="text-sm font-bold">{streak}</span>
                            </div>
                        )}
                        <span className="text-sm text-blue-100">{Math.round(progress)}% {t('complete')}</span>
                    </div>
                </div>
                <div className="progress-container w-full h-3 rounded-full overflow-hidden">
                    <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </header>
    );
};
