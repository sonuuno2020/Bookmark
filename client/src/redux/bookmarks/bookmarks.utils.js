
export const addBookmarkEntry = (state, payload) => {
  const { id, categoryId } = payload;

  let updatedAllIds = state.allIds.filter(bookmarkId => bookmarkId !== id)
  return {
    ...state,
    activeCategoryId: null,
    activeBookmarkId: null,
    isBookmarkAdding: false,
    allIds: updatedAllIds.concat(id),
    byId: {
      ...state.byId,
      [id]: payload
    }
  }
}

export const deleteBookmarkEntery = (state, payload) => {
  const { bookmarkId } = payload;
  const updatedAllIds = state.allIds.filter(id => id !== bookmarkId)
  const updatedById = state.byId;
  delete updatedById[bookmarkId];
  return {
    ...state,
    allIds: updatedAllIds,
    byId: updatedById,
  }
}

export const deleteBookmarksByCategory = (state, payload) => {
  const { bookmarkIds } = payload;

  const updatedById = state.byId
  bookmarkIds.forEach(id => delete updatedById[id])
  const updatedAllIds = state.allIds.filter(id => !bookmarkIds.includes(id))

  return {
    ...state,
    byId: updatedById,
    allIds: updatedAllIds
  }
}