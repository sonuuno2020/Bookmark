import { createSelector } from "reselect";

export const category = state => state.category;
export const bookmarks = state => state.bookmarks;

export const selectCategory = () => createSelector(
  [category, (_, props) => props.categoryId],
  (category, categoryId) => category.categories.find(category => category._id === categoryId)// byId[categoryId]
)

export const selectBookmarksByCategoryId = () => createSelector(
  [category, bookmarks, (_, props) => props.categoryId],
  (category, bookmarks, categoryId) => {
    let findedCategory = category.categories.find(category => category._id === categoryId)
    let bookmarkIds = findedCategory ? findedCategory.bookmarks : [];
    if (bookmarks.allIds.length == 0) return [];
    return bookmarkIds.map(id => {
      let bookmark = bookmarks.byId[id]
      // if (!bookmark) return { title: '', id: '' }
      return { title: bookmark.title, id: bookmark.id }
    })
  }
)

export const selectIsCategoryLoading = () => createSelector(
  [category],
  category => category.isCategoryLoading
)
export const selectIsCategoryAdding = createSelector(
  [category],
  category => category.isCategoryAdding
)