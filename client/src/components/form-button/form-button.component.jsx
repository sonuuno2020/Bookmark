import React from "react";

const FormButton = ({ label, isLoading }) => {

  return (
    <div className="form-group">
      {isLoading ? (
        <button className="btn btn-primary btn-lg btn-block login-btn">
          {/* <i class="fa fa-refresh fa-spin"></i>Loading */}
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </button>
      ) : (
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block login-btn"
          >{label}</button>
        )}
    </div>
  )
}

export default FormButton;