import React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";

import {
  activeCategory,
  removeActiveBookmark,
} from "../../../redux/bookmarks/bookmarks.action";
import { deleteCategory } from "../../../redux/category/category.action";

import useActiveTab from "../../../hooks/use-active-tab.hooks";
import "./setting.styles.css";

const Setting = ({
  categoryId,
  bookmarkIds,
  sortBookmarks,
  activeCategory,
  deleteCategory,
  removeActiveBookmark,
}) => {
  const activeTab = useActiveTab();
  const handleClick = () => {
    removeActiveBookmark();
    activeCategory(categoryId);
  };

  const handleDeleteCategory = useCallback(() => {
    deleteCategory({ categoryId, activeTab, bookmarkIds });
  }, [deleteCategory, categoryId, activeTab, bookmarkIds]);

  return (
    <div className="custom-dropdown p-2">
      <ul className="custom-dropdown-section">
        {/* <li><span>Rename Category</span></li>
        <li><span>Move to Another Tab</span></li> */}
        <li>
          <span onClick={() => sortBookmarks("ascending")}>Sort A-Z</span>
        </li>
        <li>
          <span onClick={() => sortBookmarks("descending")}>Sort Z-A</span>
        </li>
        <li>
          <span
            data-toggle="modal"
            data-target="#add-bookmark"
            data-backdrop="static"
            data-keyboard="false"
            onClick={handleClick}
          >
            Add Bookmark
          </span>
        </li>
        <li>
          <span onClick={handleDeleteCategory}>Delete Category</span>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeActiveBookmark: () => dispatch(removeActiveBookmark()),
  activeCategory: (categoryId) => dispatch(activeCategory(categoryId, null)),
  deleteCategory: (categoryData) => dispatch(deleteCategory(categoryData)),
});

export default connect(null, mapDispatchToProps)(Setting);
