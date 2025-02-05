import { Injectable } from "@angular/core"
import { type Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { map, mergeMap, catchError } from "rxjs/operators"
import * as TrackActions from "../actions/track.actions"
import type { TrackService } from "../../core/services/track.service"

@Injectable()
export class TrackEffects {
  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap((action) => {
        const formData = new FormData()
        Object.keys(action.track).forEach((key) => {
          formData.append(key, action.track[key])
        })
        return this.trackService.addTrack(formData).pipe(
          map((track) => TrackActions.addTrackSuccess({ track })),
          catchError((error) => of(TrackActions.addTrackFailure({ error }))),
        )
      }),
    ),
  )

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.updateTrack),
      mergeMap((action) => {
        const formData = new FormData()
        Object.keys(action.track).forEach((key) => {
          formData.append(key, action.track[key])
        })
        return this.trackService.updateTrack(action.track.id, formData).pipe(
          map((track) => TrackActions.updateTrackSuccess({ track })),
          catchError((error) => of(TrackActions.updateTrackFailure({ error }))),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private trackService: TrackService,
  ) {}
}

