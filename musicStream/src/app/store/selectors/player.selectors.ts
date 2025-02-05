import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from '../state.model';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectCurrentTrackId = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.currentTrackId
);

export const selectIsPlaying = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.isPlaying
);

export const selectCurrentTime = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.currentTime
);

export const selectDuration = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.duration
);

export const selectVolume = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.volume
);

