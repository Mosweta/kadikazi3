import React, { useState, useEffect } from 'react';
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lockscreen.css';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setRole] = useState();
  const [userId, setUserId] = useState();
  const [userValues, setUserValues] = useState('');
  const [photo, setPhoto] = useState();
  
  const navigate= useNavigate();
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setEmail(res.data.EmailAddress)
          setRole(res.data.userType);
          setUserId(res.data.userId);
          setPhoto(res.data.profilePhoto);
        }
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8081/readUser/${userId}`)
        .then(res => {
          const userData = res.data[0];
          setUserValues({
            Name: userData.Name,
            EmailAddress: userData.EmailAddress,
            Password: userData.Password,
            userType: userData.userType,
            profilePhoto: userData.profilePhoto,
          });
        })
        .catch(err => {
          console.error(err);
          setMessage('Failed to fetch user data. Please try again.');
        });
    }
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/lockscreen', { EmailAddress: email, Password: password });
      if (res.data.Status === "Success") {
        console.log('Successful Login');
        navigate(-1); // Redirect to the previous page
      } else {
        alert(res.data.Message);
        console.log(email);
      }
    } catch (err) {
      console.error('Error during lockscreen check:', err);
      alert('Error during lockscreen check. Please try again.');
      console.log(email);
    }
    console.log('Form submitted:', { EmailAddress: email, Password: password });
  };

  return (
    <div className='lockscreen'>
      <form className='myForm' onSubmit={handleSubmit}>
        
       <h1 className='myHeading'>Lockscreen</h1> 
    <img src={`${process.env.PUBLIC_URL}${userValues.profilePhoto}`} alt="Profil" className='picture' style={{ width: '140px', height: '160px', borderRadius: '50%', marginTop: '80px', marginRight:' 400px' }}  />
    <h1 className="userName">{userValues.Name}</h1> 
    <div className='myInput-box'>
          <input
            type="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hidden
          />
        </div>
        <div className='myInput-box'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />
          <FaLock className='icon' />
        </div>
        <button className='myButton' type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LockScreen;
