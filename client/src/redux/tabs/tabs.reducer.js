import TabActionTypes from "./tabs.types";
import CategoryActionTypes from '../category/category.types';

import { deleteTab, addCategory, deleteCategoryById } from './tabs.utils'

const INTIAL_STATE = {
  isTabLoading: true,
  isTabAdding: false,
  tabs: [],
  byId: {
    // "tab1": {
    //   id: "tab1",
    //   name: "college",
    //   body: "......",
    //   category: ["category1", "category2", "category3", "category4", "category5", "category6", "category7"]
    // },
    // "tab2": {
    //   id: "tab2",
    //   name: "news",
    //   body: "......",
    //   category: ["category8", "category9", "category10"]
    // },
    // "tab3": {
    //   id: "tab3",
    //   name: "Web Development",
    //   body: "......",
    //   category: ["category11", "category12", "category13", "category14", "category15", "category16", "category17"]
    // },
  },
  // allIds: ["tab1", "tab2", "tab3"]
}

const tabsReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case TabActionTypes.FETCH_TABS_SUCCESS:
    case TabActionTypes.FETCH_TABS_FAILURE:
      return {
        ...state,
        isTabLoading: false,
        tabs: action.payload
      }
    case TabActionTypes.ADD_TAB_START:
      return {
        ...state,
        isTabAdding: true,
      }
    case TabActionTypes.ADD_TAB_SUCCESS:
      return {
        ...state,
        isTabAdding: false,
        tabs: [...state.tabs, action.payload]
      }
    case TabActionTypes.ADD_TAB_FAILURE:
      return {
        ...state,
        isTabAdding: false,
      }
    case TabActionTypes.DELETE_TAB_SUCCESS:
      return {
        ...state,
        tabs: state.tabs.filter(tab => tab._id !== action.payload)
      }
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab._id !== action.payload.tab ? tab : ({ ...tab, categories: [...tab.categories, action.payload._id] })
        )
      }
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab._id !== action.payload.tabId
            ? tab
            : ({
              ...tab,
              categories: tab.categories.filter(category =>
                category !== action.payload.id
              )
            })
        )
      }
    case CategoryActionTypes.ADD_CATEGORY:
      return addCategory(state, action.payload)
    case CategoryActionTypes.DELETE_CATEGORY:
      return deleteCategoryById(state, action.payload)
    default:
      return state;
  }
}

export default tabsReducer;