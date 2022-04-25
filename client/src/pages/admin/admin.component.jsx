import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { selectUsers, selectIsDeletingUser } from '../../redux/user/user.selector';
import { deleteUser } from '../../redux/user/user.action';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

import './admin.styles.css'

const Admin = ({ users, isDeletingUser, deleteUser }) => {

  console.log(users)
  return (
    <div className='admin'>
      <Header />
      <div className="container admin-section">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-5">
                  <h2>User <b>List</b></h2>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Created</th>
                  <th>Role</th>
                  <th>User Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, i) => (
                    <tr key={user._id}>
                      <td>{i + 1}</td>
                      <td><span>{user.name}</span></td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                      <td><span className="status text-success">&bull;</span>{user._id}</td>
                      <td>
                        {
                          isDeletingUser === user._id ? (
                            <div className="spinner-border text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                              <span
                                href="#"
                                className="delete"
                                title="Delete"
                                data-toggle="tooltip"
                                onClick={() => deleteUser(user._id)}
                              ><i className="fa fa-times-circle"></i>
                              </span>
                            )
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* <div className="clearfix">
              <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
              <ul className="pagination">
                <li className="page-item disabled"><a href="#">Previous</a></li>
                <li className="page-item"><a href="#" className="page-link">1</a></li>
                <li className="page-item"><a href="#" className="page-link">2</a></li>
                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                <li className="page-item"><a href="#" className="page-link">4</a></li>
                <li className="page-item"><a href="#" className="page-link">5</a></li>
                <li className="page-item"><a href="#" className="page-link">Next</a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  isDeletingUser: selectIsDeletingUser
})
const mapDispatchToProps = dispatch => ({
  deleteUser: (userId) => dispatch(deleteUser(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin);