import { createReducer, on } from "@ngrx/store"
import { EntityState, type EntityAdapter, createEntityAdapter } from "@ngrx/entity"
import * as TrackActions from "../actions/track.actions"
import type { Track } from "../../core/models/track.model"
import type { TrackState } from "../state.model"

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>()

export const initialState: TrackState = adapter.getInitialState({
  selectedId: null,
  loading: false,
  error: null,
})

export const trackReducer = createReducer(
  initialState,
  on(TrackActions.loadTracks, (state) => ({ ...state, loading: true })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => {
    return adapter.setAll(tracks, { ...state, loading: false })
  }),
  on(TrackActions.loadTracksFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TrackActions.addTrackSuccess, (state, { track }) => {
    return adapter.addOne(track, state)
  }),
  on(TrackActions.updateTrackSuccess, (state, { track }) => {
    return adapter.updateOne({ id: track.id, changes: track }, state)
  }),
  on(TrackActions.deleteTrackSuccess, (state, { id }) => {
    return adapter.removeOne(id, state)
  }),
  on(TrackActions.selectTrack, (state, { id }) => ({ ...state, selectedId: id })),
)

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

