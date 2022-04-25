import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./category.styles.css";
import Setting from "./setting/setting.component";
import {
  selectCategory,
  selectBookmarksByCategoryId,
} from "../../redux/category/category.selector";
import Bookmark from "../bookmark/bookmark.component";

const compare = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const Category = (props) => {
  const [active, setActive] = useState(true);
  const toggle = () => setActive((active) => !active);

  const { category, categoryId, bookmarksById } = props;
  const [bmark, setBmark] = useState(bookmarksById);
  useEffect(() => {
    setBmark(bookmarksById);
  }, [bookmarksById]);
  const sortBookmarks = useCallback((order) => {
    let compare;
    if (order === "ascending") {
      compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    } else {
      compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
    }
    setBmark((prevState) => [...prevState.sort(compare)]);
    // console.log(bmark)
  }, []);

  if (!category) return <div></div>;
  const { title, bookmarks } = category;

  console.log("Category", bmark);
  return (
    <div id="accordion" className="col-12 col-sm-6 col-lg-4 mb-3">
      <div className="card">
        <div className="card-header p-0 d-flex category_title_background">
          <h5 className="mb-0">
            <button className="btn btn-link text-light">{title}</button>
          </h5>
          <div className="ml-auto mb-0">
            <Setting
              categoryId={categoryId}
              bookmarkIds={bookmarks}
              sortBookmarks={sortBookmarks}
            />
          </div>
          <div>
            {/* <button className="btn btn-link text-light">
              <i
                id="headingOne"
                data-toggle="collapse"
                data-target={`#${categoryId}`}
                aria-expanded="true"
                aria-controls="collapseOne"
                className={`fa fa-chevron-${active ? 'down' : 'up'}`}
                onClick={toggle}
              ></i>
            </button> */}
          </div>
        </div>
        <div
          id={categoryId}
          className="collapse show" // show is use for collapse and expand the category
          aria-labelledby="headingOne"
          // data-parent="#accordion"
        >
          {bmark.map((bookmark) => (
            <Bookmark
              key={bookmark.id}
              bookmarkId={bookmark.id}
              categoryId={categoryId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  // console.log('Category mapStateToProps', state, props)
  const category = selectCategory();
  const bookmarksById = selectBookmarksByCategoryId();
  return createStructuredSelector({
    category,
    bookmarksById,
  });
};

export default connect(mapStateToProps)(Category);
