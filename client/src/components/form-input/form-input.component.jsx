import React from "react";

import './form-input.styles.css';

const FormInput = (props) => {
  const { name, value, type, required, placeholder, handleChange, pattern, maxLength, title } = props;
  // console.log(name)
  return (
    <div className="wrap-input100 validate-input">
      <input
        className={`${value ? 'has-val' : ''} input100`}
        type={type}
        name={name}
        required={required}
        onChange={handleChange}
        value={value}
        pattern={pattern}
        maxLength={maxLength}
        title={title}
      />
      <span className="focus-input100" data-placeholder={placeholder}></span>
    </div>
  )
}

export default FormInput;
/* <div className="form-group">
        <input
          type={type}
          className="form-control"
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div> */