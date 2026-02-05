import React, { useState } from 'react';
import { X } from 'lucide-react';

const Settings = ({ onClose, settings, onUpdateSettings }) => {
    // Initialize state from props. using conditional rendering means this runs fresh each open.
    const [localSettings, setLocalSettings] = useState({
        focus: settings?.focus || 25,
        shortBreak: settings?.shortBreak || 5,
        longBreak: settings?.longBreak || 15
    });

    const handleChange = (key, value) => {
        // Allow empty string to let user delete digits
        if (value === '') {
            setLocalSettings(prev => ({ ...prev, [key]: '' }));
            return;
        }

        const intVal = parseInt(value, 10);
        if (!isNaN(intVal)) {
            setLocalSettings(prev => ({ ...prev, [key]: intVal }));
        }
    };

    const handleSave = () => {
        const newSettings = {
            focus: Number(localSettings.focus) || 25,
            shortBreak: Number(localSettings.shortBreak) || 5,
            longBreak: Number(localSettings.longBreak) || 15
        };
        onUpdateSettings(newSettings);
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999, /* Boosted Z-Index to prevent hiding */
            }}
        >
            {/* stopPropagation prevents clicks inside the modal from closing it if we add overlay click later */}
            <div
                className="glass-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '90%',
                    maxWidth: '320px',
                    padding: '1.5rem',
                    margin: 0,
                    gap: '1.5rem',
                    transform: 'translateY(0)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Settings</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'transparent', color: 'var(--text-secondary)' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Focus Duration (min)</label>
                        <input
                            type="number"
                            value={localSettings.focus}
                            onChange={(e) => handleChange('focus', e.target.value)}
                            min="1" max="60"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Short Break (min)</label>
                        <input
                            type="number"
                            value={localSettings.shortBreak}
                            onChange={(e) => handleChange('shortBreak', e.target.value)}
                            min="1" max="30"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Long Break (min)</label>
                        <input
                            type="number"
                            value={localSettings.longBreak}
                            onChange={(e) => handleChange('longBreak', e.target.value)}
                            min="1" max="60"
                            style={inputStyle}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--accent-gradient)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: 600,
                        marginTop: '0.5rem'
                    }}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const inputStyle = {
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    padding: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    width: '100%',
    outline: 'none'
};

export default Settings;
