import type { EntityState } from "@ngrx/entity"
import type { Track } from "../core/models/track.model"

export interface AppState {
  tracks: TrackState
  player: PlayerState
  auth: AuthState
}

export interface TrackState extends EntityState<Track> {
  selectedId: string | null
  loading: boolean
  error: any
}

export interface PlayerState {
  currentTrackId: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
}

export interface AuthState{
  user:any,
  error:any,
  loading:boolean
}


