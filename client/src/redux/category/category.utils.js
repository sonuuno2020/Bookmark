export const addCategoryEntry = (state, payload) => {
  const { categoryId, name } = payload

  // Create our new Category object
  const category = { id: categoryId, name, bookmarks: [] }

  // Insert the new Category object into the updated lookup table
  return {
    ...state,
    byId: {
      ...state.byId,
      [categoryId]: category,
    },
    allIds: state.allIds.concat(categoryId)
  }
}

export const addBookmarkById = (state, payload) => {
  const { categoryId, bookmarkId } = payload;
  const category = state.byId[categoryId];

  let updatedAllIds = category.bookmarks.filter(id => id.toString() !== bookmarkId.toString())

  return {
    ...state,
    byId: {
      ...state.byId,
      [categoryId]: {
        ...category,
        bookmarks: updatedAllIds.concat(bookmarkId)
      }
    }
  };
}

export const deleteBookmarkById = (state, payload) => {
  const { categoryId, bookmarkId } = payload;
  const updateCategory = state.byId[categoryId];
  const updatedBookmarksId = updateCategory.bookmarks.filter(id => id !== bookmarkId)


  return {
    ...state,
    byId: {
      ...state.byId,
      [categoryId]: {
        ...updateCategory,
        bookmarks: updatedBookmarksId
      }
    }
  }
}

export const deleteCategoryEntery = (state, payload) => {

  const { categoryId } = payload;
  const existingById = state.byId;
  delete existingById[categoryId];
  const updatedAllIds = state.allIds.filter(id => id !== categoryId);

  return {
    ...state,
    byId: existingById,
    allIds: updatedAllIds
  }
}