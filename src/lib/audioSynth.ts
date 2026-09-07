// Lightweight Web Audio API Synthesizer for Gesture Sonification

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isPlaying) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public play(x: number, y: number) {
    if (this.isMuted) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Inverted or mapped coordinates
      // x: 0 to 1 maps to pentatonic/musical frequency range (220Hz to 880Hz)
      const minFreq = 220; // A3
      const maxFreq = 880; // A5
      const targetFreq = minFreq * Math.pow(maxFreq / minFreq, Math.max(0, Math.min(1, x)));

      // y: 0 to 1 (0 is top, 1 is bottom) maps to lowpass filter cutoff
      const minFilter = 400;
      const maxFilter = 3200;
      const targetFilter = maxFilter - (maxFilter - minFilter) * Math.max(0, Math.min(1, y));

      if (!this.isPlaying || !this.osc || !this.gainNode || !this.filterNode) {
        // Start fresh oscillator
        this.osc = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();
        this.filterNode = this.ctx.createBiquadFilter();

        this.osc.type = 'sine';
        this.osc.frequency.setValueAtTime(targetFreq, now);

        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(targetFilter, now);
        this.filterNode.Q.setValueAtTime(3, now);

        // Smooth attack
        this.gainNode.gain.setValueAtTime(0.0001, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.04);

        this.osc.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.osc.start(now);
        this.isPlaying = true;
      } else {
        // Smoothly modulate active frequency and filter
        this.osc.frequency.setTargetAtTime(targetFreq, now, 0.03);
        this.filterNode.frequency.setTargetAtTime(targetFilter, now, 0.03);
      }
    } catch (err) {
      console.warn('Web Audio synthesis error:', err);
    }
  }

  public stop() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Smooth release to prevent clicking
      this.gainNode.gain.setTargetAtTime(0.0001, now, 0.05);

      const oscToStop = this.osc;
      setTimeout(() => {
        try {
          oscToStop?.stop();
          oscToStop?.disconnect();
        } catch {
          // ignore already stopped
        }
      }, 70);

      this.isPlaying = false;
      this.osc = null;
    } catch {
      this.isPlaying = false;
    }
  }
}

export const synth = new AudioSynthesizer();
