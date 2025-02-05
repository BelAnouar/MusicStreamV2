import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"

import { Store } from "@ngrx/store"
import { of } from "rxjs"
import { withLatestFrom, mergeMap, map, catchError } from "rxjs/operators"
import * as PlayerActions from "../actions/player.actions"
import  { AudioService } from "../../core/services/audio.service"
import  { TrackService } from "../../core/services/track.service"
import  { AppState } from "../state.model"
import * as fromTrack from "../selectors/track.selectors"
import { Action } from "@ngrx/store"

@Injectable()
export class PlayerEffects {
  loadTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadTrack),
      withLatestFrom(this.store.select(fromTrack.selectTrackEntities)),
      mergeMap(([action, trackEntities]) => {
        const track = trackEntities[action.trackId]
        if (track) {
          return this.trackService.getAudioFile(track.id).pipe(
            mergeMap((audioBlob) => this.audioService.loadTrack(track, audioBlob)),
            map(() => PlayerActions.play()),
            catchError((error) => of(PlayerActions.loadTrackError({ error }))),
          )
        }
        return of(PlayerActions.loadTrackError({ error: "Track not found" }))
      }),
    ),
  )

  play$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.play),
      map(() => {
        this.audioService.play()
        return { type: "[Player] Play Success" }
      }),
    ),
  )

  pause$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.pause),
      map(() => {
        this.audioService.pause()
        return { type: "[Player] Pause Success" }
      }),
    ),
  )

  stop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.stop),
      map(() => {
        this.audioService.stop()
        return { type: "[Player] Stop Success" }
      }),
    ),
  )

  setCurrentTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setCurrentTime),
      map((action) => {
        this.audioService.setCurrentTime(action.time)
        return { type: "[Player] Set Current Time Success" }
      }),
    ),
  )

  setVolume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setVolume),
      map((action) => {
        this.audioService.setVolume(action.volume)
        return { type: "[Player] Set Volume Success" }
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private audioService: AudioService,
    private trackService: TrackService,
  ) {}
}

