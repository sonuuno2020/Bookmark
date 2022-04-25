import React, { memo } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import Category from '../category/category.component';
import BookmarkForm from '../bookmark-form/bookmark-form.component';
import { selectCategoryIds } from '../../redux/tabs/tabs.selector';

const CategoryList = (props) => {
  const { categoryIds } = props;
  const categoryList = categoryIds ? categoryIds.map(
    categoryId => <Category key={categoryId} categoryId={categoryId} />
  ) : null

  console.log('Category List')
  return (
    <div className="row">
      {
        categoryList
      }
      <BookmarkForm />
    </div>
  )
}

const mapStateToProps = () => {
  const categoryIds = selectCategoryIds()
  // console.log('mapStateToProps')
  return createStructuredSelector({
    categoryIds
  })
}

export default connect(mapStateToProps)(memo(CategoryList));