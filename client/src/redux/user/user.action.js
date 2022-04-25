import { createBrowserHistory } from 'history'

import { FETCH, API } from '../../utils/api'
import UserActionTypes from './user.types';
import { setError } from '../error/error.action'

export const history = createBrowserHistory()

const loginStart = () => ({
  type: UserActionTypes.LOGIN_START
})
const loginSuccess = (resData) => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  payload: resData
})
const loginFailure = (resData) => ({
  type: UserActionTypes.LOGIN_FAILURE,
  payload: resData
})

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    FETCH({
      url: API.LOGIN,
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        let errorMessage;
        if (res.status === 422) {
          errorMessage = 'Validation failed. Password must be minimum 5 character';
        }
        else if (res.status === 500) {
          errorMessage = 'Internal server error.';
        } else if (res.status === 401) {
          errorMessage = 'Wrong email address and password!';
        }
        if (errorMessage) throw new Error(errorMessage)
        return res.json();
      })
      .then(resData => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('isAdmin', resData.isAdmin);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(loginSuccess({
          token: resData.token,
          userId: resData.userId,
          isAdmin: resData.isAdmin
        }));
        setAutoLogout(remainingMilliseconds, dispatch);
        window.location.reload();
        window.location.href = '/dashboard'
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err))
        dispatch(loginFailure({ message: err }));
        // window.jQuery("#login").modal("hide");
        window.jQuery("#errorPopup").modal("show");
      });
  };

}

export const signup = ({ name, email, password }) => {
  const signupStart = () => ({
    type: UserActionTypes.SIGNUP_START
  })
  const signupSuccess = (resData) => ({
    type: UserActionTypes.SIGNUP_SUCCESS,
    payload: resData
  })
  const signupfailure = (resData) => ({
    type: UserActionTypes.SIGNUP_FAILURE,
    payload: resData
  })
  let isError = false;
  return dispatch => {
    dispatch(signupStart())
    FETCH({
      url: API.SIGNUP,
      method: 'PUT',
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (res.status === 422 || res.status === 500) {
          isError = res.status;
        }
        return res.json();
      })
      .then(resData => {
        if (isError) {
          let errorMessage = 'Validation failed. ';
          if (isError === 422) {
            if (resData.data.find(error => error.param === 'email')) {
              errorMessage += "Make sure the email address isn't used yet! "
            }
            if (resData.data.find(error => error.param === 'password')) {
              errorMessage += 'Password must be minimum 5 character. ';
            }
          }
          else if (isError === 500) {
            errorMessage = 'Internal server error.';
          }
          throw new Error(errorMessage)
        }
        dispatch(signupSuccess({
          token: null,
          userId: null,
          isAdmin: null,
          message: 'Signup Successfully!'
        }))
        window.jQuery("#signup").modal("hide");
        // window.jQuery("#login").modal("show");
        window.jQuery("#confirmationPopup").modal("show");
        // this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err))
        dispatch(signupfailure({ message: err }));
        window.jQuery("#signup").modal("hide");
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const checkAuthenticationStatus = () => {
  const checkLogin = () => ({
    type: UserActionTypes.CHECK_LOGIN
  })
  return dispatch => {
    dispatch(checkLogin())
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      dispatch({ type: UserActionTypes.LOGOUT })
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler(dispatch);
      return;
    }
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(loginSuccess({
      token: token,
      userId: userId,
      isAdmin: isAdmin
    }));
    setAutoLogout(remainingMilliseconds, dispatch);
  }
}

const setAutoLogout = (milliseconds, dispatch) => {
  setTimeout(() => {
    logoutHandler(dispatch);
  }, milliseconds);
}

const logoutHandler = (dispatch) => {
  dispatch({ type: UserActionTypes.LOGOUT })
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
}

export const userList = () => {

  return dispatch => {
    dispatch({ type: UserActionTypes.USERS_LIST_START });

    FETCH({ url: API.USERS_LIST })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Not Authorized')
        }
        return res.json()
      })
      .then(resData => {
        dispatch({
          type: UserActionTypes.USERS_LIST_SUCCESS,
          payload: resData.users
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(({ type: UserActionTypes.USERS_LIST_FAILURE, payload: err }));
      });
  }
}

export const getUserDetails = () => {

  return dispatch => {
    dispatch({ type: UserActionTypes.USER_DETAILS_START });

    FETCH({ url: API.USER_DETAILS })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Not Authorized')
        }
        return res.json()
      })
      .then(resData => {
        dispatch({
          type: UserActionTypes.USER_DETAILS_SUCCESS,
          payload: resData.user
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err))
        dispatch(({ type: UserActionTypes.USER_DETAILS_FAILURE, payload: err }));
      });
  }
}
export const changePassword = (data) => {
  console.log(data)
  return dispatch => {
    dispatch({ type: UserActionTypes.CHANGE_PASSWORD_START });

    FETCH({ url: API.CHANGE_PASSWORD, method: 'PUT', body: JSON.stringify(data) })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Not Authorized')
        }
        return res.json()
      })
      .then(resData => {
        dispatch({
          type: UserActionTypes.CHANGE_PASSWORD_SUCCESS,
          payload: "Password Upadated!"
        });
        window.jQuery("#confirmationPopup").modal("show");
        window.jQuery("#change-password").modal("hide");
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
        dispatch(({ type: UserActionTypes.CHANGE_PASSWORD_FAILURE }));
      });
  }
}

export const removeMessage = () => ({
  type: UserActionTypes.REMOVE_MESSAGE
})

export const deleteUser = (userId) => {
  return dispatch => {
    dispatch({ type: UserActionTypes.DELETE_USER_START, payload: userId });

    FETCH({ url: API.DELETE_USER + userId, method: 'DELETE' })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Not Authorized')
        }
        return res.json()
      })
      .then(resData => {
        console.log(resData)
        dispatch({
          type: UserActionTypes.DELETE_USER_SUCCESS,
          payload: {
            message: `${resData.data.name} is deleted from System!`,
            userId: userId
          }
        });
        window.jQuery("#confirmationPopup").modal("show");
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err))
        dispatch({ type: UserActionTypes.DELETE_USER_FAILURE })
        window.jQuery("#errorPopup").modal("show");
      });
  }
}