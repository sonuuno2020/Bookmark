import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signup } from '../../redux/user/user.action';
import { setError } from '../../redux/error/error.action';
import { selectAuthLoading } from '../../redux/user/user.selector';

import useFormInput from '../../hooks/use-form-input.hooks';

import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';

import Logo from '../assets/logo/logo_transparent.png';

import './signup.sytles.css';

const SignUp = (props) => {
  const { signup, setError, authLoading } = props;

  const [user, updateUser, resetUser] = useFormInput({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = user;

  const SubmitSignupForm = (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error('Password must be match!')
      }
      signup({ name, email, password })
    }
    catch (err) {
      console.log(err)
      setError(err)
      window.jQuery("#signup").modal("hide");
      window.jQuery("#errorPopup").modal("show");
    }
  }

  return (
    <div id="signup" className="modal fade">
      <div className="modal-dialog modal-login">
        <div className="modal-content">
          <div className="modal-header">
            <div className="avatar">
              <img src={Logo} alt="Avatar" />
            </div>
            <h4 className="modal-title">Bookmark Easy</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={SubmitSignupForm}>
              <FormInput
                name='name'
                value={name}
                placeholder='User name'
                type='test'
                required
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updateUser}
              />
              <FormInput
                name='email'
                value={email}
                placeholder='Email'
                type='email'
                required
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updateUser}
              />
              <FormInput
                name='password'
                value={password}
                placeholder='Password'
                type='password'
                required
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updateUser}
              />
              <FormInput
                name='confirmPassword'
                value={confirmPassword}
                placeholder='confirm password'
                type='password'
                required
                maxLength="100"
                title='3 and more Alphabetic letter'
                handleChange={updateUser}
              />
              <FormButton
                type='submit'
                label='Sign up'
                isLoading={authLoading}
              />
            </form>
          </div>
          {/* <div className="modal-footer" data-toggle="modal" aria-hidden="true" data-target="#login" data-dismiss="modal">
            <Link to='#'>Login</Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  authLoading: selectAuthLoading
})

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
  setError: err => dispatch(setError(err))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);