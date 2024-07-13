import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


import './Admin.css';
import logo from './Assets/images/logo.png';
import profile from './Assets/images/profile.png';
import settings from './Assets/images/setting.png';
import help from './Assets/images/help.png';
import logout from './Assets/images/logout.png';



const Admin = () => {
  const navigate = useNavigate();
  const [userType, setRole] = useState();
  const [userId, setUserId] = useState();
  const [userValues, setUserValues] = useState();
  const [photo, setPhoto] = useState();
  const [message, setMessage] = useState('');
  const subMenuRef = useRef(null);
  
  axios.defaults.withCredentials = true;
  
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
  
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     axios.get('http://localhost:8081/logout')
  //       .catch(err => console.log(err));
  //   };

  //   const handlePopState = () => {
  //     axios.get('http://localhost:8081/logout')
  //       .then(() => {
  //         navigate('/login'); // Ensure redirect to login
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [navigate]);

  useEffect(() => {
    let timer;
    const reload = () => {
      timer = setTimeout(() => {
        navigate('/lockscreen');
      }, 300000); // 5 minutes
    };

    const cancelTimer = () => {
      clearTimeout(timer);
      reload();
    };

    reload();

    window.addEventListener('mousemove', cancelTimer);
    window.addEventListener('click', cancelTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', cancelTimer);
      window.removeEventListener('click', cancelTimer);
    };
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(() => {
        navigate('/'); // Redirect to login page after logout
      })
      .catch(err => console.log(err));
  };
  
  const toggleMenu = () => {
    if (subMenuRef.current) {
      subMenuRef.current.classList.toggle("open-menu");
    }
  };

  

  return (
    <div className='banner'>
       <div className="navbar">
        <img src={logo} alt="Logo" className='logo' />
        <ul>
          <li><a href="http://localhost:3000/">Home</a></li>
          <li><a href="http://localhost:3000/about">About</a></li>
          <li><a href="http://localhost:3000/contact">Contact</a></li>
          <li><a href="http://localhost:3000/lockscreen">Lockscreen</a></li>
          <img src={userValues?.profilePhoto} alt="user" className='user-pic' onClick={toggleMenu} />
          {/* <li color="#fff" onClick={handleLogout}><a href="#">Logout</a></li> */}
        </ul>
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
            <a href="#" onClick={handleLogout}  className='sub-menu-link'>
              <img src={logout} alt="logout" />
              <p>Logout</p>
              <span>&gt;</span>
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {/* <li><img src={profilePic} alt="Profile Picture" className="profile-pic" /></li> */}
        <li><a href={`http://localhost:3000/editProfile`}>Edit Profile</a></li>
        <li><a href="/users">Manage Users</a></li>
        <li><a href="/manageClients">Manage Clients</a></li>
        <li><a href="/manageStaff">Manage Staff</a></li>
        <li><a href="/manageAdmins">Manage Admins</a></li>
        <li><a href="/register-car">Register Car</a></li>
        <li><a href="/view-payments">View Payments</a></li>
        <li><a href="/manage-bookings">Manage Bookings</a></li>
      </ul>
    </div>
      <h1>Welcome Admin</h1>
    </div>
  );
}

     

export default Admin;
