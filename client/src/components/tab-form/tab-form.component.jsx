import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addTab } from '../../redux/tabs/tabs.action';
import { selectIsTabAdding } from '../../redux/tabs/tabs.selector';

import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';
import { useState } from 'react';


const TabForm = ({ addTab, isTabAdding }) => {

  const [name, setName] = useState('');

  const handleChange = e => setName(e.target.value)
  const handleSubmit = e => {
    e.preventDefault();
    try {
      const tab = { title: name.trim() }
      addTab(tab)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id='add-tab' className='modal fade'>
      <div className="modal-dialog modal-add-tab">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Tab</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <FormInput
                name='title'
                value={name}
                placeholder='Name'
                type='text'
                required
                pattern="^[a-zA-Z_]+( [a-zA-Z_]+)*$"
                maxLength="30"
                title='3 and more Alphabetic letter'
                handleChange={handleChange}
              />
              <FormButton
                type='submit'
                label='Add'
                isLoading={isTabAdding}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isTabAdding: selectIsTabAdding
})

const mapDispatchToProps = dispatch => ({
  addTab: tab => dispatch(addTab(tab))
})

export default memo(connect(mapStateToProps, mapDispatchToProps)(TabForm));