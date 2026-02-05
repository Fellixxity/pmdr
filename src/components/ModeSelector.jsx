import React from 'react';

const ModeSelector = ({ currentMode, onModeChange }) => {
    const modes = [
        { id: 'focus', label: 'Focus' },
        { id: 'shortBreak', label: 'Short Break' },
        { id: 'longBreak', label: 'Long Break' },
    ];

    return (
        <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '0.25rem',
            borderRadius: '999px',
            gap: '0.25rem'
        }}>
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onModeChange(mode.id)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        background: currentMode === mode.id ? 'var(--text-primary)' : 'transparent',
                        color: currentMode === mode.id ? '#1a1a2e' : 'var(--text-secondary)',
                    }}
                >
                    {mode.label}
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;
