import CategoryActionTypes from "./category.types";
import { generateId } from "../../utils/generate-id.utils";
import { API, FETCH } from '../../utils/api';
import { setError } from '../error/error.action';


// export const addCategory = (tabId, name) => {
//   const categoryId = generateId();
//   return {
//     type: CategoryActionTypes.ADD_CATEGORY,
//     payload: { tabId, categoryId, name }
//   }
// }

// export const deleteCategory = (categoryData) => ({
//   type: CategoryActionTypes.DELETE_CATEGORY,
//   payload: categoryData
// })

export const fetchCategories = () => {
  return dispatch => {
    dispatch({ type: CategoryActionTypes.GET_CATEGORIES_START })
    FETCH({ url: API.GET_CATEGORIES })
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
          type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
          payload: resData.categories.map(category => ({
            title: category.title,
            _id: category._id,
            bookmarks: category.bookmarks,
            tab: category.tab
          }))
        })
      })
      .catch(err => {
        dispatch({ type: CategoryActionTypes.GET_CATEGORIES_FAILURE, payload: [] })
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const addCategory = (CategoryData) => {
  return dispatch => {
    dispatch({ type: CategoryActionTypes.ADD_CATEGORY_START })
    FETCH({
      url: API.POST_CATEGORY,
      method: 'POST',
      body: JSON.stringify(CategoryData)
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
        console.log(resData)
        dispatch({
          type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
          payload: {
            title: resData.category.title,
            _id: resData.category._id,
            bookmarks: resData.category.bookmarks,
            tab: resData.category.tab
          }
        })
        window.jQuery("#add-category").modal("hide");
      })
      .catch(err => {
        dispatch({ type: CategoryActionTypes.ADD_CATEGORY_FAILURE, payload: [] })
        dispatch(setError(err))
        window.jQuery("#add-category").modal("hide");
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const deleteCategory = (categoryData) => {
  return dispatch => {
    dispatch({ type: CategoryActionTypes.DELETE_CATEGORY_START })
    FETCH({
      url: API.DELETE_CATEGORY + categoryData.categoryId,
      method: 'DELETE',
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
          type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS,
          payload: {
            id: resData.category._id,
            tabId: resData.category.tab
          }
        })
      })
      .catch(err => {
        dispatch({ type: CategoryActionTypes.DELETE_CATEGORY_FAILURE, payload: [] })
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
      });
  }
}