import React from 'react';

const FormTextarea = (props) => {
  const { name, value, type, required, placeholder, handleChange, pattern, maxLength, title } = props;
  return (
    <div className="form-group">
      <textarea
        className='form-control'
        type={type}
        name={name}
        required={required}
        onChange={handleChange}
        value={value}
        pattern={pattern}
        maxLength={maxLength}
        title={title}
        placeholder={placeholder}
      ></textarea>
    </div>
  )
}

export default FormTextarea;