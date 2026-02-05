import React from 'react';
import { playClick } from '../utils/sound';

const Controls = ({ isActive, onToggle, onReset }) => {
    const handleToggle = () => {
        playClick();
        onToggle();
    };

    const handleReset = () => {
        playClick();
        onReset();
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
                onClick={handleToggle}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'var(--glass-border)' : 'var(--text-primary)',
                    color: isActive ? 'var(--text-primary)' : '#1a1a2e',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'scale(1)' : 'scale(1.05)',
                    boxShadow: isActive ? 'none' : '0 4px 12px rgba(255, 255, 255, 0.3)'
                }}
            >
                {isActive ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}
            </button>

            <button
                onClick={handleReset}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: '1px solid var(--text-secondary)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-primary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-secondary)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                </svg>
            </button>
        </div>
    );
};

export default Controls;
