import ErrorActionTypes from './error.types';


const INTIAL_STATE = {
  message: null,
  isError: false
};

const errorReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case ErrorActionTypes.SET_ERROR:
      return {
        ...state,
        message: action.payload.message,
        isError: true
      }

    case ErrorActionTypes.DELETE_ERROR:
      return {
        ...state,
        message: null,
        isError: false
      }
    default:
      return state;
  }
}

export default errorReducer;