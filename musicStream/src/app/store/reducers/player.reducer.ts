import { createReducer, on } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';
import { PlayerState } from '../state.model';

export const initialState: PlayerState = {
  currentTrackId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1
};

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.play, state => ({ ...state, isPlaying: true })),
  on(PlayerActions.pause, state => ({ ...state, isPlaying: false })),
  on(PlayerActions.stop, state => ({ ...state, isPlaying: false, currentTime: 0 })),
  on(PlayerActions.setCurrentTime, (state, { time }) => ({ ...state, currentTime: time })),
  on(PlayerActions.setVolume, (state, { volume }) => ({ ...state, volume })),
  on(PlayerActions.loadTrack, (state, { trackId }) => ({ ...state, currentTrackId: trackId, currentTime: 0 }))
);

