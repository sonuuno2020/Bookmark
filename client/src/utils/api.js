
const URL = 'https://bmark-easy.herokuapp.com'
// const URL = 'http://localhost:5000'

export const API = {
  'LOGIN': URL + '/auth/login',
  'SIGNUP': URL + '/auth/signup',
  'GET_BOOKMARKS': URL + '/bookmark',
  'GET_BOOKMARK': URL + '/bookmark/',
  'POST_BOOKMARK': URL + '/bookmark/',
  'DELETE_BOOKMARK': URL + '/bookmark/',
  'GET_CATEGORIES': URL + '/category',
  'GET_CATEGORY': URL + '/category/',
  'POST_CATEGORY': URL + '/category/',
  'DELETE_CATEGORY': URL + '/category/',
  'GET_TABS': URL + '/tab',
  'GET_TAB': URL + '/tab/',
  'POST_TAB': URL + '/tab/',
  'DELETE_TAB': URL + '/tab/',
  "USERS_LIST": URL + '/auth/users',
  "USER_DETAILS": URL + '/auth/user',
  'CHANGE_PASSWORD': URL + '/auth/change-password',
  'DELETE_USER': URL + '/auth/user/'
}

export const FETCH = ({ url, method, body }) => {
  return fetch(url, {
    method: method ? method : 'GET',
    headers: {
      Authorization: (url !== 'LOGIN' && url !== 'SIGNUP') && 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: body
  })

}