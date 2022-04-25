import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteError } from '../../redux/error/error.action';
import { selectErrorMessage } from '../../redux/error/error.selector';

import './error-popup.styles.css';

const ErrorPopup = ({ message, deleteError }) => {

  return (
    <div id="errorPopup" className="modal fade" data-keyboard="false" data-backdrop="static">
      <div className="modal-dialog modal-error">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <i className="material-icons">&times;</i>
            </div>
            <button type="button" onClick={() => deleteError()} className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body text-center">
            <h4>Ooops!</h4>
            <p>{message}</p>
            <button className="btn btn-success" data-dismiss="modal" onClick={() => deleteError()}>Try Again</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  message: selectErrorMessage
})

const mapDispatchToProps = dispatch => ({
  deleteError: () => dispatch(deleteError())
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);