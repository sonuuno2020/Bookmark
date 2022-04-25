import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBookmark } from '../../redux/bookmarks/bookmarks.selector';

import useContextMenu from '../../hooks/use-context-menu.hooks';

import './bookmark.styles.css';
import BookmarkDropdown from '../bookmark-dropdown/bookmark-dropdown.component';

const Bookmark = (props) => {
  const { bookmark, bookmarkId, categoryId, } = props;

  const { xPos, yPos, showMenu } = useContextMenu(bookmarkId)

  console.log('BOOKMARK', bookmarkId, categoryId)
  // if (true) return <div id={bookmarkId} ></div>

  const { url, title } = bookmark;

  return (
    <div id={bookmarkId} className="card-body p-2">
      <p className='m-0 bookmark'>
        <abbr title={title}>
          <a
            href={url}
            target='_blank'
            className="card-link"
            rel="noopener noreferrer"
          >{title}</a>
        </abbr>
      </p>
      {showMenu && (
        <BookmarkDropdown
          xPos={xPos}
          yPos={yPos}
          categoryId={categoryId}
          bookmarkId={bookmarkId}
        />)}
    </div >
  )
}

const mapStateToProps = (state, props) => {
  const bookmark = selectBookmark();
  return createStructuredSelector({
    bookmark
  })
}

export default connect(mapStateToProps, null)(Bookmark);