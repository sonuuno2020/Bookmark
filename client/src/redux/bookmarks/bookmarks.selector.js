import { createSelector } from "reselect";

export const bookmarks = state => state.bookmarks;

export const selectBookmark = () => createSelector(
  [bookmarks, (state, props) => props.bookmarkId],
  (bookmarks, bookmarkId) => bookmarks.byId[bookmarkId]
)

export const selectToggleBookmarkForm = createSelector(
  [bookmarks],
  bookmarks => bookmarks.toggleBookmarkForm
)

export const selectActiveCategoryId = createSelector(
  [bookmarks],
  bookmarks => bookmarks.activeCategoryId
)

export const selectActiveBookmark = createSelector(
  [bookmarks],
  bookmarks => bookmarks.byId[bookmarks.activeBookmarkId]
)

export const selectBookmarks = createSelector(
  [bookmarks],
  bookmarks => {
    return bookmarks.allIds.map(id => ({
      title: bookmarks.byId[id].title,
      url: bookmarks.byId[id].url,
      tags: bookmarks.byId[id].tags,
    }))
  }
)

export const selectIsBookmarkAdding = createSelector(
  [bookmarks],
  bookmarks => bookmarks.isBookmarkAdding
)