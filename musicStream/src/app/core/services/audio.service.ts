import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private platformId = inject(PLATFORM_ID);
  private audioContext: AudioContext | null = null;
  private audioSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;

  private currentTrack = new BehaviorSubject<Track | null>(null);
  private isPlaying = new BehaviorSubject<boolean>(false);
  private currentTime = new BehaviorSubject<number>(0);
  private duration = new BehaviorSubject<number>(0);
  private volume = new BehaviorSubject<number>(1);

  private initAudioContext(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  getCurrentTrack(): Observable<Track | null> {
    return this.currentTrack.asObservable();
  }

  getIsPlaying(): Observable<boolean> {
    return this.isPlaying.asObservable();
  }

  getCurrentTime(): Observable<number> {
    return this.currentTime.asObservable();
  }

  getDuration(): Observable<number> {
    return this.duration.asObservable();
  }

  getVolume(): Observable<number> {
    return this.volume.asObservable();
  }

  async loadTrack(track: Track, audioBlob: Blob | undefined): Promise<void> {
    if (!audioBlob) {
      throw new Error('Audio blob is undefined');
    }

    try {
      this.initAudioContext();
      if (!this.audioContext || !this.gainNode) {
        throw new Error('AudioContext not available');
      }

      this.stop();
      this.currentTrack.next(track);

      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.audioSource = this.audioContext.createBufferSource();
      this.audioSource.buffer = audioBuffer;
      this.audioSource.connect(this.gainNode);

      this.duration.next(audioBuffer.duration);
    } catch (error) {
      console.error('Error loading track:', error);
      this.currentTrack.next(null);
      throw error;
    }
  }

  async play(): Promise<void> {
    if (!this.audioContext) return;

    try {
      if (this.audioSource && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      if (this.audioSource) {
        this.audioSource.start();
        this.isPlaying.next(true);
        this.updateCurrentTime();
      }
    } catch (error) {
      console.error('Error playing track:', error);
      this.isPlaying.next(false);
      throw error;
    }
  }

  pause(): void {
    try {
      if (this.audioSource) {
        this.audioSource.stop();
        this.isPlaying.next(false);
      }
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  }

  stop(): void {
    try {
      if (this.audioSource) {
        this.audioSource.stop();
        this.isPlaying.next(false);
        this.currentTime.next(0);
      }
    } catch (error) {
      console.error('Error stopping track:', error);
    }
  }

  async setCurrentTime(time: number): Promise<void> {
    try {
      this.stop();
      this.currentTime.next(time);
      await this.play();
    } catch (error) {
      console.error('Error setting current time:', error);
      throw error;
    }
  }

  setVolume(volume: number): void {
    try {
      if (!this.audioContext || !this.gainNode) return;

      this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      this.volume.next(volume);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  private updateCurrentTime(): void {
    const update = () => {
      if (this.isPlaying.value) {
        const newTime = this.currentTime.value + 0.1;
        if (newTime <= this.duration.value) {
          this.currentTime.next(newTime);
          setTimeout(update, 100);
        } else {
          this.stop();
        }
      }
    };
    update();
  }
}
