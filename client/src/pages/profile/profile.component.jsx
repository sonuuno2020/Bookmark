import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { selectUserDetails, selectIsUserLoaded } from '../../redux/user/user.selector';
import { getUserDetails } from '../../redux/user/user.action';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Preloader from '../../components/preloader/preloader.component';

import ChangePassword from './change-password/change-password.component';

import './profile.styles.css'

const Profile = ({ isUserLoaded, user, getUserDetails }) => {

  // console.log(user)
  useEffect(() => {
    getUserDetails()
  }, [getUserDetails])


  if (isUserLoaded) return <Preloader />
  let date = new Date(user.createdAt).toLocaleDateString()

  return (
    <div className='profile'>
      <Header />
      <div className="container profile-section">
        <div className="container">
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                <img src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png " alt="profile" className="img" />
              </div>
              <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8">
                <div className="container">
                  <h2>{`${user.name[0].toUpperCase() + user.name.slice(1)}`}</h2>
                </div>
                <hr />
                <ul className="container details">
                  <li className='user-details'><p>UserId: </p>{user._id}</li>
                  <li className='user-details'><p>Email: </p>{user.email}</li>
                  <li className='user-details'><p>Date of Joining: </p>{date}</li>
                </ul>
                <button
                  className='btn btn-md btn-block user-button ml-auto mr-auto mt-5 '
                  data-toggle="modal"
                  data-target="#change-password"
                  data-backdrop="static"
                  data-keyboard="false"
                >Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChangePassword />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUserDetails,
  isUserLoaded: selectIsUserLoaded
})
const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails())
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);