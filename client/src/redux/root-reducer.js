import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tabsReducer from './tabs/tabs.reducer';
import categoryReducer from './category/category.reducer';
import bookmarksReducer from './bookmarks/bookmarks.reducer';
import userReducer from './user/user.reducer';
import errorReducer from './error/error.reducer';


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['tabs', 'category', 'bookmarks']
  whitelist: []
}

const rootReducer = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
  category: categoryReducer,
  bookmarks: bookmarksReducer,
  error: errorReducer
})

export default persistReducer(persistConfig, rootReducer);