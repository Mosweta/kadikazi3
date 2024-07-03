import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaUser } from "react-icons/fa";
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Assets/images/user.png';
const EditProfile = () => {
  const [userValues, setUserValues] = useState({
    userId: '',
    Name: '',
    EmailAddress: '',
    profilePhoto: null,
  });
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081')
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

    axios.put('http://localhost:8081/updateProfile', formData, {
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

  return (
    <div className="d-flex  justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={handleSubmit}>
          <h2 className='text-center mb-4'>Update User</h2>
          <Link to={'/admin2'}>X</Link>
          {/* {userValues.profilePhoto && typeof userValues.profilePhoto === 'string' && (
            <img src={userValues.profilePhoto} alt="Profile" className="mb-3" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          )} */}
          <img src={`${process.env.PUBLIC_URL}${userValues.profilePhoto}`} alt="Profil"  style={{ width: '160px', height: '160px', borderRadius: '50%', marginLeft:'180px' }}  />
          <Form.Group className="mb-3">
            
            <Form.Control
              type="text"
              value={userValues.userId}
              disabled
              hidden
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Username"
                value={userValues.Name}
                onChange={(e) => setUserValues({ ...userValues, Name: e.target.value })}
                
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaUser /></span>
              </div>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <div className="input-group">
              <Form.Control
                type="email"
                placeholder="Email"
                value={userValues.EmailAddress}
                onChange={(e) => setUserValues({ ...userValues, EmailAddress: e.target.value })}
                
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <div className="input-group">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                
              />
            </div>
          </Form.Group>
          
          <Button variant="primary" type="submit" className="w-100">Submit</Button>
          {message && <Alert variant={success ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
        </Form>
      </div>
    </div>
  );
}

export default EditProfile;
