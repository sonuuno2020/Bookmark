import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMessage } from '../../redux/user/user.selector';
import { removeMessage } from '../../redux/user/user.action';

import './confirmation-popup.styles.css';

const ConfirmationPopup = ({ message, removeMessage }) => {

  return (
    <div id="confirmationPopup" className="modal fade" data-keyboard="false" data-backdrop="static">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <i className="material-icons fa fa-check"></i>
            </div>
            <h4 className="modal-title">Awesome!</h4>
          </div>
          <div className="modal-body">
            <p className="text-center">{message}</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-success btn-block"
              data-dismiss="modal"
              onClick={removeMessage}
            >OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  message: selectMessage
})

const mapDispatchToProps = dispatch => ({
  removeMessage: () => dispatch(removeMessage())
})
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopup);