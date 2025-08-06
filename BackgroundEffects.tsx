

import React, { useState, useEffect } from 'react';

interface Particle {
    id: number;
    style: React.CSSProperties;
}

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    return <div className="particle" style={style}></div>;
};

export const BackgroundEffects: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const addParticle = () => {
            const newParticle: Particle = {
                id: Date.now() + Math.random(),
                style: {
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${Math.random() * 10 + 15}s`,
                }
            };

            setParticles(p => [...p, newParticle]);

            setTimeout(() => {
                setParticles(p => p.filter(particle => particle.id !== newParticle.id));
            }, 25000);
        };

        const intervalId = setInterval(addParticle, 3000);
        
        // Add initial particles
        for(let i=0; i < 5; i++) {
            setTimeout(addParticle, i * 1000);
        }

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating Shapes */}
            <div className="floating absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full" style={{ animationDelay: '0s' }}></div>
            <div className="floating absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full" style={{ animationDelay: '-2s' }}></div>
            <div className="floating absolute bottom-40 left-20 w-24 h-24 bg-blue-300/20 rounded-full" style={{ animationDelay: '-4s' }}></div>
            <div className="floating absolute bottom-20 right-10 w-12 h-12 bg-blue-500/20 rounded-full" style={{ animationDelay: '-1s' }}></div>
            
            {/* Particles */}
            <div id="particles" className="absolute inset-0 overflow-hidden">
                {particles.map(p => (
                    <Particle key={p.id} style={p.style} />
                ))}
            </div>
        </div>
    );
};
