import React from 'react';

import './success-popup.styles.css';

const SuccessPopup = ({ message }) => {

  return (
    <div id="successPopup" className="modal fade">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <i className="material-icons">&#xE876;</i>
            </div>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body text-center">
            <h4>Great!</h4>
            <p>{message}</p>
            <button className="btn btn-success" data-dismiss="modal"><span>Start Exploring</span> <i className="material-icons">&#xE5C8;</i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPopup;