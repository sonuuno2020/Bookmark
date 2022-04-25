import ErrorActionTypes from './error.types';

export const setError = (err) => ({
  type: ErrorActionTypes.SET_ERROR,
  payload: err
})

export const deleteError = (err) => ({
  type: ErrorActionTypes.DELETE_ERROR,
  payload: err
})
