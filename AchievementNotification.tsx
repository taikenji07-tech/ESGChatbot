
import React from 'react';
import type { Achievement, Language } from './types';
import { translations } from './translations';
import { AwardIcon, RocketIcon, CompassIcon, Globe2Icon, BrainCircuitIcon, FlameIcon } from './Icons';

interface AchievementNotificationProps {
    achievement: Achievement | null;
    language: Language;
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    award: AwardIcon,
    rocket: RocketIcon,
    compass: CompassIcon,
    'globe-2': Globe2Icon,
    'brain-circuit': BrainCircuitIcon,
    flame: FlameIcon,
};

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement, language }) => {
    if (!achievement) return null;

    const IconComponent = iconMap[achievement.icon] || AwardIcon;
    const t = (key: string) => translations[language][key] || key;

    const title = t(achievement.titleKey);
    const desc = `${t(achievement.descKey)} +${achievement.points} ${t('points')}`;

    return (
        <div 
            className="achievement-badge-wrapper fixed top-24 right-6 z-50 transition-transform duration-500"
            style={{ transform: achievement ? 'translateX(0)' : 'translateX(120%)' }}
        >
            <div className="achievement-badge p-4 rounded-xl text-white shadow-xl">
                <div className="flex items-center gap-3">
                    <IconComponent className="w-6 h-6" />
                    <div>
                        <div className="font-bold text-sm">{title}</div>
                        <div className="text-xs opacity-90">{desc}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
