
export const deleteTab = (state, action) => {
  const { payload } = action;
  const activeTab = payload;
  const existingAllIds = state.allIds.filter(id => id !== activeTab)
  delete state.byId[activeTab];

  // delete category function call

  return {
    byId: state.byId,
    allIds: existingAllIds
  }
}

export const addCategory = (state, payload) => {
  const { tabId, categoryId } = payload

  // Look up the correct tab, to simplify the rest of the code
  const tab = state.byId[tabId]

  return {
    ...state,
    // Update our Post object with a new "comments" array
    byId: {
      ...state.byId,
      [tabId]: {
        ...tab,
        category: tab.category.concat(categoryId)
      }
    }
  }
}

export const deleteCategoryById = (state, payload) => {
  const { categoryId, activeTab } = payload;
  const tab = state.byId[activeTab]
  return {
    ...state,
    byId: {
      ...state.byId,
      [activeTab]: {
        ...tab,
        category: tab.category.filter(id => id !== categoryId)
      }
    }
  }
}