import React, { useState, useEffect } from 'react';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import Settings from './components/Settings';
import useTimer from './hooks/useTimer';
import { Settings as SettingsIcon } from 'lucide-react';
import { playClick } from './utils/sound';

function App() {
    const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Load settings from localStorage
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('pomodoro-settings');
        return saved ? JSON.parse(saved) : { focus: 25, shortBreak: 5, longBreak: 15 };
    });

    const {
        timeLeft,
        progress,
        isActive,
        toggleTimer,
        resetTimer
    } = useTimer(mode, settings);

    const handleModeChange = (newMode) => {
        playClick();
        setMode(newMode);
    };

    const handleUpdateSettings = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('pomodoro-settings', JSON.stringify(newSettings));
    };

    return (
        <div className="app-container">
            {isSettingsOpen && (
                <Settings
                    onClose={() => setIsSettingsOpen(false)}
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
                />
            )}

            <main className="glass-card">
                <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-1rem' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.05em' }}>FOCUS FLOW</h1>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // playClick(); // Temporarily disabled to prevent potential audio context lock
                            setIsSettingsOpen(true);
                        }}
                        style={{ background: 'transparent', color: 'var(--text-secondary)' }}
                    >
                        <SettingsIcon size={24} />
                    </button>
                </header>

                <ModeSelector currentMode={mode} onModeChange={handleModeChange} />

                <TimerDisplay
                    timeLeft={timeLeft}
                    progress={progress}
                    mode={mode}
                />

                <Controls
                    isActive={isActive}
                    onToggle={toggleTimer}
                    onReset={resetTimer}
                />
            </main>
        </div>
    );
}

export default App;
