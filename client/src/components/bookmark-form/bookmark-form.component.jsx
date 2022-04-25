import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addBookmark } from '../../redux/bookmarks/bookmarks.action';
import { selectIsBookmarkAdding, selectActiveCategoryId, selectActiveBookmark } from '../../redux/bookmarks/bookmarks.selector';

import useFormInput from '../../hooks/use-form-input.hooks';

import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';
import FormTextarea from '../form-textarea/form-textarea.component';

import './bookmark-form.styles.css';
import { useEffect } from 'react';

const BookmarkForm = ({ categoryId, isBookmarkAdding, activeBookmark, addBookmark }) => {
  console.log(categoryId, activeBookmark, activeBookmark ? activeBookmark.title : '')
  const [bookmark, updadeBookmark, resetBookmark, update] = useFormInput({
    title: '',
    url: '',
    tags: '',
    notes: ''
  })
  useEffect(() => {
    update(activeBookmark)

  }, [activeBookmark])

  const handleSubmit = e => {
    e.preventDefault()
    try {
      addBookmark({
        _id: categoryId,
        title,
        url,
        tags: tags.split(','),
        notes,
        id: activeBookmark ? activeBookmark.id : null
      })
      // resetBookmark({
      //   title: '',
      //   url: '',
      //   tags: '',
      //   notes: '',
      // })
    } catch (err) {
      console.log(err)
    }
  }
  const { title, url, tags, notes } = bookmark;
  return (
    <div id='add-bookmark' className='modal fade'>
      <div className="modal-dialog modal-add-bookmark">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New Bookmark</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <FormInput
                name='title'
                value={title}
                placeholder='Title'
                type='text'
                required
                pattern="^[a-zA-Z_]+( [a-zA-Z_]+)*$"
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updadeBookmark}
              />
              <FormInput
                name='url'
                value={url}
                placeholder='URL'
                type='text'
                required
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updadeBookmark}
              />
              <FormTextarea
                name='tags'
                value={tags}
                placeholder='Seprate tags by commas'
                type='text'
                title='3 and more Alphabetic letter'
                handleChange={updadeBookmark}
              />
              <FormTextarea
                name='notes'
                value={notes}
                placeholder='Notes'
                type='text'
                title='3 and more Alphabetic letter'
                handleChange={updadeBookmark}
              />
              <FormButton
                type='submit'
                label='Add'
                isLoading={isBookmarkAdding}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  categoryId: selectActiveCategoryId,
  activeBookmark: selectActiveBookmark,
  isBookmarkAdding: selectIsBookmarkAdding
})

const mapDispatchToProps = dispatch => ({
  addBookmark: (data) => dispatch(addBookmark(data))
})

export default memo(connect(mapStateToProps, mapDispatchToProps)(BookmarkForm));