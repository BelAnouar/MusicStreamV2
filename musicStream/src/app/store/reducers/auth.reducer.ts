import {createReducer, on} from "@ngrx/store";
import  * as AuthActions from "../actions/auth.actions"
import {AuthState} from "../state.model";

export const initialState:AuthState={
  user:null,
  error:null,
  loading:false
}


export const authReducer=createReducer(
  initialState,
  on(AuthActions.loginAuth,(state)=>({...state,loading:true})),
  on(AuthActions.loginSuccess,(state,{user})=>({...state,user,loading:false,error:null})),
  on(AuthActions.loginFailure,(state,{error})=>({...state,error,loading:false})),

)
