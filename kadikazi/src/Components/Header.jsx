import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs';
 import {FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import logo from './Assets/images/logo.png';
import profile from './Assets/images/profile.png';
import settings from './Assets/images/setting.png';
import help from './Assets/images/help.png';
import logout from './Assets/images/logout.png';

function Header({OpenSidebar}) {
  const [userType, setRole] = useState();
  const [userId, setUserId] = useState();
  const [userValues, setUserValues] = useState();
  const [photo, setPhoto] = useState();
  const [message, setMessage] = useState('');
  const [adminValues, setAdminValues] = useState({
    userId: '',
    fName: '',
    lName: '',
  });
  const navigate= useNavigate();
  const subMenuRef = useRef(null);
  axios.defaults.withCredentials = true;
  const toggleMenu = () => {
    if (subMenuRef.current) {
      subMenuRef.current.classList.toggle("open-menu");
    }
  };


  // const toggleMenu = () => {
  //   if (subMenuRef.current) {
  //     subMenuRef.current.classList.toggle("open-menu");
  //   }
  // };

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
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
          });
        })
        .catch(err => {
          console.log(err);
          setMessage('Failed to fetch admin details');
        });
    }
  }, [userId]);
  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(() => {
        navigate('/'); // Redirect to login page after logout
      })
      .catch(err => console.log(err));
  };
  
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        
        <div className='header-left'>
            <BsSearch  className='icon' onClick={handleLogout}/>
            
        </div>
        <FaPowerOff className='icon'/>
        <div className='header-right'>
          
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            
            
            {adminValues?.fName}{adminValues?.lName}
            <img src={userValues?.profilePhoto} alt="user" className='user-pic' onClick={toggleMenu} />
            <div className="navbar">
        
          
        
        <div className='sub-menu-wrap' id='subMenu' ref={subMenuRef}>
          <div className='sub-menu'>
            <div className='user-info'>
              <img src={userValues?.profilePhoto} alt="user" />
              <h2>{userValues?.Name}</h2>
              
            </div>
            <hr />
            <a href="http://localhost:3000/editProfile" className='sub-menu-link'>
              <img src={profile} alt="profile" />
              <p>Edit Profile</p>
              <span>&gt;</span>
            </a>
            <a href="#" className='sub-menu-link'>
              <img src={settings} alt="settings" />
              <p>Settings & Privacy</p>
              <span>&gt;</span>
            </a>
            <a href="#" className='sub-menu-link'>
              <img src={help} alt="help" />
              <p>Help & Support</p>
              <span>&gt;</span>
            </a>
            <a href="#" className='sub-menu-link'>
              <img src={logout} alt="logout" />
              <p>Logout</p>
              <span>&gt;</span>
            </a>
          </div>
        </div>
      </div>
        </div>
    </header>
    
  )
}

export default Header
