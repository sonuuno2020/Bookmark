import UserActionTypes from './user.types';


const INTIAL_STATE = {
  isAuth: false,
  token: null,
  userId: null,
  isAdmin: null,
  authLoading: false,
  isDeletingUser: false,
  checkLogin: true,
  isUserLoaded: true,
  pendingRefreshingToken: null,
  isChangePassword: null,
  error: null,
  message: null
};

const userReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case UserActionTypes.LOGIN_START:
    case UserActionTypes.SIGNUP_START:
    case UserActionTypes.CHECK_LOGIN:
      return {
        ...state,
        authLoading: true
      }
    case UserActionTypes.LOGIN_SUCCESS:
    case UserActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAdmin: action.payload.isAdmin === 'true' ? true : false,
        checkLogin: false,
        authLoading: false,
        token: action.payload.token,
        userId: action.payload.userId,
        message: action.payload.message
      }
    case UserActionTypes.LOGIN_FAILURE:
    case UserActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isAuth: false,
        checkLogin: false,
        users: [],
        authLoading: false,
        error: action.payload
      }
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: null,
        userId: null,
        checkLogin: false,
        authLoading: false,
        pendingRefreshingToken: null,
        error: null
      }
    case UserActionTypes.USERS_LIST_START:
      return {
        ...state,
        checkLogin: true
      }
    case UserActionTypes.USERS_LIST_SUCCESS:
      return {
        ...state,
        checkLogin: false,
        users: action.payload
      }
    case UserActionTypes.USERS_LIST_FAILURE:
      return {
        ...state,
        checkLogin: false,
        users: [],
        error: action.payload
      }
    case UserActionTypes.USER_DETAILS_START:
      return {
        ...state,
        isUserLoaded: true
      }
    case UserActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        isUserLoaded: false,
        user: action.payload
      }
    case UserActionTypes.USER_DETAILS_FAILURE:
      return {
        ...state,
        isUserLoaded: false,
        user: null,
        error: action.payload
      }
    case UserActionTypes.CHANGE_PASSWORD_START:
      return {
        ...state,
        isChangePassword: true
      }
    case UserActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePassword: false,
        message: action.payload
      }
    case UserActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isChangePassword: false,
      }
    case UserActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null
      }
    case UserActionTypes.DELETE_USER_START:
      return {
        ...state,
        isDeletingUser: action.payload
      }
    case UserActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeletingUser: null,
        message: action.payload.message,
        users: state.users.filter(u => u._id !== action.payload.userId)
      }
    case UserActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        isDeletingUser: null,
      }
    default:
      return state;
  }
}

export default userReducer;