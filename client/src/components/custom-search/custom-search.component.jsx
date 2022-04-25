import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBookmarks } from '../../redux/bookmarks/bookmarks.selector';

import FormInput from '../form-input/form-input.component';

import './custom-search.styles.css';

const CustomSearch = ({ bookmarks }) => {

  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  let body = bookmarks.filter(bookmark => bookmark.title.toLowerCase().includes(search))
  console.log(search, body)
  // let body = bookmarks.filter(bookmark => bookmark.tags.toLowerCase().includes(search))
  return (
    <div className='custom-search'>
      <FormInput
        name='search'
        value={search}
        placeholder='Search Bookmarks'
        type='text'
        title='3 and more Alphabetic letter'
        handleChange={handleChange}
      />
      <div className={`dropdown-menu drop-menu ${search.length > 1 && body.length >= 1 ? 'show' : ''}`}>
        {
          body.map((item, idx) => (
            <a
              target='_blank'
              href={item.url}
              key={idx}
              className="dropdown-item"
              onClick={() => {
                setSearch('')
              }}
            >{item.title}</a>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarks
})

export default connect(mapStateToProps, null)(CustomSearch);