import { createSelector } from 'reselect'

export const tabs = state => state.tabs;
export const activeTab = (state, props) => state.tabs.tabs.find(tab => tab._id === props.activeTab)

export const selectTabs = createSelector(
  [tabs],
  tabs => tabs.tabs.map(tab => ({ name: tab.title, id: tab._id }))
)

export const selectCategoryIds = () => createSelector(
  [activeTab],
  (tab) => tab ? tab.categories : null
)

export const selectIsTabAdding = createSelector(
  [tabs],
  tabs => tabs.isTabAdding
)
export const selectIsTabLoading = createSelector(
  [tabs],
  tabs => tabs.isTabLoading
)

export const selectFirstTab = createSelector(
  [tabs],
  tabs => tabs.tabs[0] ? tabs.tabs[0]._id : null
)