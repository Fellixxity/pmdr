// Web Audio API to generate sounds without external files

let audioContext = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
};

// Play a pleasant chime sound
export const playChime = () => {
    try {
        const ctx = getAudioContext();
        const t = ctx.currentTime;

        // Resume context if suspended (browser policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Bell-like sound properties
        osc.type = 'sine';

        // Frequency envelope (starts high, drops slightly)
        osc.frequency.setValueAtTime(880, t); // A5
        osc.frequency.exponentialRampToValueAtTime(440, t + 0.1);

        // Amplitude envelope (sharp attack, long decay)
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2);

        osc.start(t);
        osc.stop(t + 2);
    } catch (e) {
        console.error('Audio playback failed', e);
    }
};

// Play a subtle click for buttons
export const playClick = () => {
    try {
        const ctx = getAudioContext();
        const t = ctx.currentTime;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.start(t);
        osc.stop(t + 0.1);
    } catch (e) {
        // Ignore errors for clicks
    }
};
