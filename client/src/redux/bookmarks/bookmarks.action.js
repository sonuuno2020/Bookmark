import BookmarksActionTypes from './bookmarks.types';
import { generateId } from '../../utils/generate-id.utils';
import { API, FETCH } from '../../utils/api';
import { setError } from '../error/error.action';
import CategoryActionTypes from '../category/category.types';
import bookmarks from './bookmarks.data';

export const activeCategory = (categoryId, bookmarkId) => ({
  type: BookmarksActionTypes.ACTIVE_CATEGORY,
  payload: { categoryId, bookmarkId }
})

export const removeActiveBookmark = () => ({
  type: BookmarksActionTypes.ROMOVE_ACTIVE_BOOKMARK
})

// export const addBookmark = (data) => {
//   let bookmarkId = generateId()
//   // console.log(data)
//   if (data.id) {
//     bookmarkId = data.id
//   }
//   return {
//     type: BookmarksActionTypes.ADD_BOOKMARK,
//     payload: { bookmarkId, ...data }
//   }
// }

// export const deleteBookmark = (bookMarkData) => ({
//   type: BookmarksActionTypes.DELETE_BOOKMARK,
//   payload: bookMarkData
// })

export const fetchBookmarks = () => {
  return dispatch => {
    dispatch({ type: BookmarksActionTypes.GET_BOOKMARKS_START })
    FETCH({ url: API.GET_BOOKMARKS })
      .then(res => {
        let errorMessage;
        if (res.status !== 200) {
          errorMessage = 'Failed to fetch the Data. Please Refresh the Page.';
        }
        if (errorMessage) throw new Error(errorMessage)
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        dispatch({
          type: BookmarksActionTypes.GET_BOOKMARKS_SUCCESS,
          payload: {
            byId: resData.bookmarks.reduce((accumulator, bookmark) => ({
              ...accumulator,
              [bookmark._id]: {
                title: bookmark.title,
                url: bookmark.url,
                tags: bookmark.tags,
                id: bookmark._id,
                categoryId: bookmark.category,
              }
            }), {}),
            allIds: resData.bookmarks.map(bookmark => bookmark._id)
          }
        })
      })
      .catch(err => {
        dispatch({ type: BookmarksActionTypes.GET_BOOKMARKS_FAILURE, payload: { byId: {}, allIds: [] } })
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const addBookmark = (BookmarkData) => {
  console.log(BookmarkData, API.POST_BOOKMARK + (BookmarkData.id ? BookmarkData.id : ""))
  return dispatch => {
    dispatch({ type: BookmarksActionTypes.ADD_BOOKMARK_START })
    FETCH({
      url: API.POST_BOOKMARK + (BookmarkData.id ? BookmarkData.id : ""),
      method: BookmarkData.id ? 'PUT' : 'POST',
      body: JSON.stringify(BookmarkData)
    })
      .then(res => {
        let errorMessage;
        if (res.status === 422) {
          errorMessage = 'Validation failed.';
        }
        else if (res.status === 500) {
          errorMessage = 'Internal server error. Please try again!';
        }
        else if (res.status !== 200 && res.status !== 201) {
          errorMessage = 'Not Authorized!'
        }
        if (errorMessage) throw new Error(errorMessage)
        return res.json();
      })
      .then(resData => {
        // console.log(resData)
        dispatch({
          type: BookmarksActionTypes.ADD_BOOKMARK_SUCCESS,
          payload: {
            title: resData.bookmark.title,
            url: resData.bookmark.url,
            tags: resData.bookmark.tags,
            id: resData.bookmark._id,
            categoryId: resData.bookmark.category,
          }
        })
        window.jQuery("#add-bookmark").modal("hide");
      })
      .catch(err => {
        dispatch({ type: BookmarksActionTypes.ADD_BOOKMARK_FAILURE, payload: {} })
        dispatch(setError(err))
        window.jQuery("#add-bookmark").modal("hide");
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const deleteBookmark = (BookmarkData) => {
  return dispatch => {
    dispatch({ type: BookmarksActionTypes.DELETE_BOOKMARK_START })
    FETCH({
      url: API.DELETE_BOOKMARK + BookmarkData.bookmarkId,
      method: 'DELETE',
      body: JSON.stringify(BookmarkData)
    })
      .then(res => {
        let errorMessage;
        if (res.status === 500) {
          errorMessage = 'Internal server error. Please try again!';
        }
        else if (res.status !== 200 && res.status !== 201) {
          errorMessage = 'Not Authorized!'
        }
        if (errorMessage) throw new Error(errorMessage)
        return res.json();
      })
      .then(resData => {
        // console.log(resData)
        dispatch({
          type: BookmarksActionTypes.DELETE_BOOKMARK_SUCCESS,
          payload: BookmarkData
        })
      })
      .catch(err => {
        dispatch({ type: BookmarksActionTypes.DELETE_BOOKMARK_FAILURE, payload: {} })
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
      });
  }
}