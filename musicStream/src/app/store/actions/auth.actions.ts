import { createAction, props } from '@ngrx/store';

export const loginAuth = createAction(
  '[Auth] Login',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
