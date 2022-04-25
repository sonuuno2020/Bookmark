import { createSelector } from "reselect";

export const user = state => state.user;

export const selectIsAuth = createSelector(
  [user],
  user => user.isAuth
)
export const selectUserId = createSelector(
  [user],
  user => user.userId
)
export const selectToken = createSelector(
  [user],
  user => user.Token
)
export const selectAuthLoading = createSelector(
  [user],
  user => user.authLoading
)
export const selectCheckLogin = createSelector(
  [user],
  user => user.checkLogin
)
export const selectError = createSelector(
  [user],
  user => user.error
)
export const selectUsers = createSelector(
  [user],
  user => user.users
)
export const selectIsAdmin = createSelector(
  [user],
  user => user.isAdmin
)

export const selectIsUserLoaded = createSelector(
  [user],
  user => user.isUserLoaded
)

export const selectUserDetails = createSelector(
  [user],
  user => user.user
)

export const selectIsChangePassowrd = createSelector(
  [user],
  user => user.isChangePassword
)

export const selectMessage = createSelector(
  [user],
  user => user.message
)

export const selectIsDeletingUser = createSelector(
  [user],
  user => user.isDeletingUser
)