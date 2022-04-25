import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { login } from '../../redux/user/user.action';
import { selectAuthLoading } from '../../redux/user/user.selector';

import useFormInput from '../../hooks/use-form-input.hooks';

import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';

import Logo from '../assets/logo/logo_transparent.png';

import './login.styles.css';

const Login = (props) => {
  const { login, authLoading } = props;

  const [user, updateUser, resetUser] = useFormInput({
    email: '',
    password: ''
  })

  const SubmitLoginForm = async (event) => {
    event.preventDefault();
    login(email, password)

  }

  const { email, password } = user;
  return (
    <div id="login" className="modal fade">
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
            <form onSubmit={SubmitLoginForm}>
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
              <FormButton
                type='submit'
                label='Login'
                isLoading={authLoading}
              />
              {/* <div className="form-group">
                <button
                  type="submit"
                  data-toggle="modal"
                  aria-hidden="true"
                  data-target="#confirmationPopup"
                  data-dismiss="modal"
                  className="btn btn-primary btn-lg btn-block login-btn"
                >
                  Login
                </button>
              </div> */}
            </form>
          </div>
          <div className="modal-footer">
            <Link to='#'>Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  authLoading: selectAuthLoading
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);