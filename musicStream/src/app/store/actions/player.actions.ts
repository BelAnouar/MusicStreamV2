import { createAction, props } from "@ngrx/store"

export const play = createAction("[Player] Play")
export const pause = createAction("[Player] Pause")
export const stop = createAction("[Player] Stop")
export const setCurrentTime = createAction("[Player] Set Current Time", props<{ time: number }>())
export const setVolume = createAction("[Player] Set Volume", props<{ volume: number }>())
export const loadTrack = createAction("[Player] Load Track", props<{ trackId: string }>())
export const loadTrackError = createAction("[Player] Load Track Error", props<{ error: any }>())

