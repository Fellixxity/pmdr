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
        let interval;
        if (isActive && timeLeft > 0) {
            // Calculate the exact time when the timer should finish
            const endTime = Date.now() + timeLeft * 1000;

            interval = setInterval(() => {
                const now = Date.now();
                const remaining = Math.max(0, Math.round((endTime - now) / 1000));

                if (remaining <= 0) {
                    setTimeLeft(0);
                    setIsActive(false);
                    playChime();
                    clearInterval(interval);
                } else {
                    // Only update state if the rounded second has changed
                    setTimeLeft(remaining);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]); // Only restart the tracker when isActive changes

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
