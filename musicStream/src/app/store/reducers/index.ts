import type { ActionReducerMap, MetaReducer } from "@ngrx/store"
import { environment } from "../../../environments/environments"
import * as fromTrack from "./track.reducer"
import * as fromPlayer from "./player.reducer"
import * as fromAuth from "./auth.reducer"
import type { AppState } from "../state.model"


export const reducers: ActionReducerMap<AppState> = {
  tracks: fromTrack.trackReducer,
  player: fromPlayer.playerReducer,
  auth: fromAuth.authReducer

}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : []

