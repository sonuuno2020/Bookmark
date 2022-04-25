import CategoryActionTypes from '../category/category.types';
import bookmarks from './bookmarks.data';
import BookmarksActionTypes from './bookmarks.types';
import { addBookmarkEntry, deleteBookmarkEntery, deleteBookmarksByCategory } from './bookmarks.utils';

const INTIAL_STATE = {
  // ...bookmarks,
  activeCategoryId: null,
  activeBookmarkId: null,
  isBookmarkLoading: true,
  isBookmarkAdding: false,
  allIds: [],
  byId: {}
}

const bookmarksReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {

    case BookmarksActionTypes.ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategoryId: action.payload.categoryId,
        activeBookmarkId: action.payload.bookmarkId
      }
    case BookmarksActionTypes.ROMOVE_ACTIVE_BOOKMARK:
      return {
        ...state,
        activeCategoryId: null,
        activeBookmarkId: null
      }
    case BookmarksActionTypes.GET_BOOKMARKS_SUCCESS:
    case BookmarksActionTypes.GET_BOOKMARKS_FAILURE:
      return {
        ...state,
        isBookmarkLoading: false,
        byId: action.payload.byId,
        allIds: action.payload.allIds
      }
    case BookmarksActionTypes.ADD_BOOKMARK_START:
      return {
        ...state,
        isBookmarkAdding: true
      }
    case BookmarksActionTypes.ADD_BOOKMARK_SUCCESS:
      return addBookmarkEntry(state, action.payload)
    // return {
    //   ...state,
    //   isBookmarkAdding: false,
    //   allIds: state.allIds.concat(action.payload.id),
    //   byId: {
    //     ...state.byId,
    //     [action.payload.id]: action.payload
    //   }
    // }
    case BookmarksActionTypes.ADD_BOOKMARK_FAILURE:
      return {
        ...state,
        isBookmarkAdding: false,
      }
    case BookmarksActionTypes.DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        allIds: state.allIds.filter(bookmark =>
          bookmark.id !== action.payload.bookmarkId
        )
      }
    case CategoryActionTypes.DELETE_CATEGORY:
      return deleteBookmarksByCategory(state, action.payload)
    default:
      return state;
  }
}

export default bookmarksReducer;