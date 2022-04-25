import TabActionTypes from "./tabs.types"
import { API, FETCH } from '../../utils/api';
import { setError } from '../error/error.action'

// export const deleteTab = (activeTab) => ({
//   type: TabActionTypes.DELETE_TAB,
//   payload: activeTab
// })

export const fetchTabs = (userId) => {
  return dispatch => {
    dispatch({ type: TabActionTypes.FETCH_TABS_START })
    FETCH({
      url: API.GET_TABS,
    })
      .then(res => {
        let errorMessage;
        if (res.status !== 200) {
          errorMessage = 'Failed to fetch the Data. Please Refresh the Page.';
        }
        if (errorMessage) throw new Error(errorMessage)
        return res.json();
      })
      .then(resData => {
        // console.log(resData)
        dispatch({
          type: TabActionTypes.FETCH_TABS_SUCCESS,
          payload: resData.tabs.map(tab => ({
            title: tab.title,
            _id: tab._id,
            categories: tab.categories
          }))
        })
      })
      .catch(err => {
        dispatch({ type: TabActionTypes.FETCH_TABS_FAILURE, payload: [] })
        dispatch(setError(err))
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const addTab = (tabData) => {
  return dispatch => {
    dispatch({ type: TabActionTypes.ADD_TAB_START })
    FETCH({
      url: API.POST_TAB,
      method: 'POST',
      body: JSON.stringify(tabData)
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
          type: TabActionTypes.ADD_TAB_SUCCESS,
          payload: {
            title: resData.tab.title,
            _id: resData.tab._id,
            categories: resData.tab.categories
          }
        })
        window.jQuery("#add-tab").modal("hide");
      })
      .catch(err => {
        dispatch({ type: TabActionTypes.ADD_TAB_FAILURE, })
        dispatch(setError(err))
        window.jQuery("#add-tab").modal("hide");
        window.jQuery("#errorPopup").modal("show");
      });
  }
}

export const deleteTab = (tabId) => {
  return dispatch => {
    dispatch({ type: TabActionTypes.DELETE_TAB_START })
    FETCH({
      url: API.DELETE_TAB + tabId,
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
          type: TabActionTypes.DELETE_TAB_SUCCESS,
          payload: tabId
        })
      })
      .catch(err => {
        dispatch({ type: TabActionTypes.DELETE_TAB_FAILURE, })
        dispatch(setError(err))
      });
  }
}