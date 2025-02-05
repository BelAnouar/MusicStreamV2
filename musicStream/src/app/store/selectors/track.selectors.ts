import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from '../state.model';
import * as fromTrack from '../reducers/track.reducer';

export const selectTrackState = createFeatureSelector<TrackState>('tracks');

export const selectTrackIds = createSelector(
  selectTrackState,
  fromTrack.selectIds
);

export const selectTrackEntities = createSelector(
  selectTrackState,
  fromTrack.selectEntities
);

export const selectAllTracks = createSelector(
  selectTrackState,
  fromTrack.selectAll
);

export const selectTrackTotal = createSelector(
  selectTrackState,
  fromTrack.selectTotal
);

export const selectCurrentTrackId = createSelector(
  selectTrackState,
  (state: TrackState) => state.selectedId
);

export const selectCurrentTrack = createSelector(
  selectTrackEntities,
  selectCurrentTrackId,
  (trackEntities, trackId) => trackId && trackEntities[trackId]
);

