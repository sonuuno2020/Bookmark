import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changePassword } from '../../../redux/user/user.action';
import { selectIsChangePassowrd } from '../../../redux/user/user.selector';

import useFormInput from '../../../hooks/use-form-input.hooks';

import FormInput from '../../../components/form-input/form-input.component';
import FormButton from '../../../components/form-button/form-button.component';

import Logo from '../../../components/assets/logo/logo_transparent.png';

import './change-password.styles.css';

const ChangePassword = (props) => {
  const { changePassword, isChangePassowrd } = props;

  const [password, updatePassword] = useFormInput({
    oldPassword: '',
    newPassword: ''
  })
  const { oldPassword, newPassword } = password;

  const SubmitChangePasswordForm = async (event) => {
    event.preventDefault();
    changePassword({ oldPassword, newPassword })
  }

  return (
    <div id="change-password" className="modal fade">
      <div className="modal-dialog modal-change-password">
        <div className="modal-content">
          <div className="modal-header">
            <div className="avatar">
              <img src={Logo} alt="Avatar" />
            </div>
            <h4 className="modal-title">Bookmark Easy</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={SubmitChangePasswordForm}>
              <FormInput
                name='oldPassword'
                value={oldPassword}
                placeholder='Existing Password'
                type='password'
                required
                maxLength="100"
                title='5 and more Alphabetic letter'
                handleChange={updatePassword}
              />
              <FormInput
                name='newPassword'
                value={newPassword}
                placeholder='New Password'
                type='password'
                required
                maxLength="100"
                title='5 and more Alphabetic letter'
                handleChange={updatePassword}
              />
              <FormButton
                type='submit'
                label='Update Password'
                isLoading={isChangePassowrd}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isChangePassowrd: selectIsChangePassowrd
})

const mapDispatchToProps = dispatch => ({
  changePassword: (data) => dispatch(changePassword(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);