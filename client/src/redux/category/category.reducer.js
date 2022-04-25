import category from './category.data';
import CategoryActionTypes from './category.types';

import BookmarksActionTypes from '../bookmarks/bookmarks.types';
import { addBookmarkById, addCategoryEntry, deleteBookmarkById, deleteCategoryEntery } from './category.utils';
import { bookmarks } from './category.selector';

const INTIAL_STATE = {
  isCategoryLoading: true,
  isCategoryAdding: false,
  categories: [],
};

const categoryReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case CategoryActionTypes.GET_CATEGORIES_SUCCESS:
    case CategoryActionTypes.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isCategoryLoading: false,
        categories: action.payload
      }
    case CategoryActionTypes.ADD_CATEGORY_START:
      return {
        ...state,
        isCategoryAdding: true,
      }
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS:
    case CategoryActionTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        isCategoryAdding: false,
        categories: [...state.categories, action.payload]
      }
    case BookmarksActionTypes.ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id !== action.payload.categoryId
            ? category
            : ({
              ...category,
              bookmarks: category.bookmarks.filter(id => id !== action.payload.id).concat(action.payload.id)
              // [...category.bookmarks, action.payload.id]
            })
        ),
      }
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload)
      }
    case BookmarksActionTypes.DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id !== action.payload.categoryId
            ? category
            : ({
              ...category,
              bookmarks: category.bookmarks.filter(bookmark =>
                bookmark !== action.payload.bookmarkId)
            })
        ),
      }

    default:
      return state;
  }
}

export default categoryReducer;