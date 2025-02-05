import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../state.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user,
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => !!user,
);
