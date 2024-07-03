import React, { useEffect, useState } from 'react';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { FaEnvelope, FaUser } from "react-icons/fa";
import { Form, Button, Alert } from 'react-bootstrap';

const Profile = () => {
  const [userValues, setUserValues] = useState({
    userId: '',
    Name: '',
    EmailAddress: '',
    profilePhoto: null,
    CurrentPassword: '',
    NewPassword:'',
    RepeatPassword:'',
  });
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [adminValues, setAdminValues] = useState({
    userId: '',
    fName: '',
    lName: '',
    Address: '',
    telephone: '',
    Gender: '',
    Specialty: '',
    EmailAddress: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then(res => {
        if (res.data.Status === "Success") {
          setUserId(res.data.userId);
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred while fetching data.");
      });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.post('http://localhost:8081/readProfile', { userId })
        .then(res => {
          const userData = res.data[0];
          setUserValues({
            userId: userData.userId,
            Name: userData.Name,
            EmailAddress: userData.EmailAddress,
            profilePhoto: userData.profilePhoto, // Assuming this is a URL
          });
        })
        .catch(err => {
          console.error(err);
          setMessage('Failed to fetch user data. Please try again.');
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios.post('http://localhost:8081/readAdminProfile', { userId })
        .then(res => {
          const adminData = res.data[0];
          setAdminValues({
            userId: adminData.userId,
            AdminId:adminData.AdminId,
            fName: adminData.fName,
            lName: adminData.lName,
            Address: adminData.Address,
            telephone: adminData.telephone,
            Gender: adminData.Gender,
            EmailAddress: adminData.EmailAddress,
          });
        })
        .catch(err => {
          console.log(err);
          setMessage('Failed to fetch admin details');
        });
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setUserValues({ ...userValues, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userValues.userId);
    formData.append('Name', userValues.Name);
    formData.append('EmailAddress', userValues.EmailAddress);
    if (userValues.profilePhoto) {
      formData.append('profilePhoto', userValues.profilePhoto);
    }

    axios.put('http://localhost:8081/updateAdminProfile', userValues, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setSuccess(true);
        setMessage('User updated successfully');
      })
      .catch(err => {
        console.error(err);
        setSuccess(false);
        setMessage('An error occurred. Please try again.');
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:8081/updateAdminDetails', adminValues)
      .then(res => {
        console.log(res);
        setSuccess(true);
        setMessage('Admin details updated successfully');
      })
      .catch(err => {
        console.log(err);
        setSuccess(false);
        setMessage('Failed to update admin details');
      });
  };
  const updateAdminPassword = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (userValues.NewPassword.trim() !== userValues.RepeatPassword.trim()) {
        setMessage('Passwords do not match');
        return;
    }

    // Check if password is at least eight characters long
    if (userValues.NewPassword.trim().length < 8) {
      setMessage('Password should be at least 8 characters ');
      return;
  }
  axios.put('http://localhost:8081/updateAdminPassword', userValues)
      .then(res => {
        console.log(res);
        setSuccess(true);
        setMessage('Admin password updated successfully');
      })
      .catch(err => {
        console.log(err);
        setSuccess(false);
        setMessage('Failed to update admin password');
      });
    }
  return (
    <div className="container light-style flex-grow-1 container-p-y" style={{ width: '60%', color: '#fff' }}>
      <h4 className="font-weight-bold py-3 mb-4">Account Profile</h4>
      {message && <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>}
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Personal Details</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-payment">Payment Details</a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="account-general">
                <div className="card-body media align-items-center">
                  <img src={ `${process.env.PUBLIC_URL}${userValues.profilePhoto}`} alt="Profile photo" className="d-block ui-w-" style={{ width: '180px', height: '180px', borderRadius: '50%', marginLeft:'180px' }} />
                  <div className="media-body ml-4">
    
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="">Username: </label>
                      <input type="text" style={{width:'250px'}} placeholder="Username" value={userValues.Name} onChange={(e) => setUserValues({ ...userValues, Name: e.target.value })} />
                      
                    </div>
                    <div className="form-group">
                      <label htmlFor="">UserEmail: </label>
                      <input type="email" style={{width:'250px'}} placeholder="Email" value={userValues.EmailAddress} onChange={(e) => setUserValues({ ...userValues, EmailAddress: e.target.value })} />
                      
                    </div>
                    <div className="form-group">
                    <label className="form-label">Profile Photo</label>
                    <input type="file" className="form-control" accept="image/*"  onChange={handleFileChange}  />
                  </div>
                    <Button type="submit">Save changes</Button>
                  </Form>
                </div>
              </div>
              <div className="tab-pane fade" id="account-change-password">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-control" onChange={(e) => setUserValues({ ...userValues, CurrentPassword: e.target.value })}  />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control" onChange={(e) => setUserValues({ ...userValues, NewPassword: e.target.value })}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Repeat new password</label>
                    <input type="password" className="form-control" onChange={(e) => setUserValues({ ...userValues, RepeatPassword: e.target.value })}/>
                  </div>
                  <Button onClick={updateAdminPassword}>Update</Button>
                </div>
              </div>
              <div className="tab-pane fade" id="account-info">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Admin Id</label>
                    <input type="text" className="form-control" value={adminValues.AdminId} disabled />
                  </div>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={adminValues.fName} onChange={(e) => setAdminValues({ ...adminValues, fName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={adminValues.lName} onChange={(e) => setAdminValues({ ...adminValues, lName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" value={adminValues.Address} onChange={(e) => setAdminValues({ ...adminValues, Address: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telephone</label>
                    <input type="text" className="form-control" value={adminValues.telephone} onChange={(e) => setAdminValues({ ...adminValues, telephone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" value={adminValues.Gender} onChange={(e) => setAdminValues({ ...adminValues, Gender: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={adminValues.EmailAddress} onChange={(e) => setAdminValues({ ...adminValues, EmailAddress: e.target.value })} />
                  </div>
                  
                  <Button onClick={handleUpdate}>Update</Button>
                </div>
              </div>
              <div className="tab-pane fade" id="account-payment">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Payment ID</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Billing Address</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Date</label>
                    <input type="text" className="form-control" />
                  </div>
                  <Button>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
