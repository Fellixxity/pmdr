import React from 'react';

const TimerDisplay = ({ timeLeft, progress, mode }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // SVG Config
    const size = 300;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Circle */}
            <svg
                width={size}
                height={size}
                style={{ transform: 'rotate(-90deg)', position: 'absolute' }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="100%" stopColor="#00f2fe" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Time Text */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <div style={{
                    fontSize: '4.5rem',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-2px',
                    textShadow: '0 0 20px rgba(79, 172, 254, 0.5)'
                }}>
                    {formatTime(timeLeft)}
                </div>
                <div style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginTop: '-0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                }}>
                    {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                </div>
            </div>
        </div>
    );
};

export default TimerDisplay;
