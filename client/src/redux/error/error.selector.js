import { createSelector } from "reselect";

export const error = state => state.error;

export const selectIsError = createSelector(
  [error],
  error => error.isError
)
export const selectErrorMessage = createSelector(
  [error],
  error => error.message
)