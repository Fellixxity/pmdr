import { useState, useEffect, useRef } from 'react';
import { playChime } from '../utils/sound';

const defaultSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
};

const useTimer = (mode, customSettings = defaultSettings) => {
    // Calculate seconds based on settings
    const getDuration = (m) => (customSettings[m] || 25) * 60;

    const [timeLeft, setTimeLeft] = useState(getDuration(mode));
    const [isActive, setIsActive] = useState(false);
    const [initialTime, setInitialTime] = useState(getDuration(mode));

    const timerRef = useRef(null);

    useEffect(() => {
        // Reset timer when mode or settings change
        const newTime = getDuration(mode);
        setTimeLeft(newTime);
        setInitialTime(newTime);
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [mode, customSettings]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            clearInterval(timerRef.current);
            playChime(); // Play sound
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(initialTime);
    };

    const setTime = (newTime) => {
        setTimeLeft(newTime);
        setInitialTime(newTime);
    };

    // Calculate progress for circular progress bar (1.0 to 0.0)
    const progress = timeLeft / initialTime;

    return {
        timeLeft,
        progress,
        isActive,
        toggleTimer,
        resetTimer,
        setTime
    };
};

export default useTimer;
