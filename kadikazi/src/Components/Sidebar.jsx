import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import {  FaUsersCog, FaUserShield, FaCar, FaPowerOff, FaLock } from "react-icons/fa";
 import {FaComputer} from 'react-icons/fa6'
 import {PiUsersThreeFill} from "react-icons/pi"
 import { PieChart } from 'react-minimal-pie-chart';
 import axios from 'axios'
 import { useNavigate, Link } from 'react-router-dom';
 
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate= useNavigate();
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                
                navigate('/login'); // Redirect to login page after logout
            })
            .catch(err => console.log(err));
    };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <FaCar  className='icon_header'/> Kadikazi
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/admin2">
                    <FaComputer className='icon'/> Admin Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
            <Link to={'/editProfile'} >
                
                <BsFillGearFill className='icon'/>Profile
           </Link>
            </li>
            
            <li className='sidebar-list-item'>
            <Link to={'/Users'} >
                
                <PiUsersThreeFill className='icon'/> Users
           </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to={'/manageAdmins'} >
                
                <FaUsersCog className='icon'/> Admin
           </Link>
                
            </li>
            <li className='sidebar-list-item'>
            <Link to={'/manageStaff'} >
                
                <FaUserShield className='icon'/> Staff
           </Link>
               
            </li>
            <Link to={'/manageClients'}/>
            <li  className='sidebar-list-item'>
            <Link to={'/manageClients'} >
                
                    <BsPeopleFill className='icon'/> Client
               </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to={'/bookings'} >
                
                    <BsMenuButtonWideFill className='icon'/> Booking
               </Link>
                
            </li>
            <li className='sidebar-list-item'>
            <Link to={'/bookings'} >
                
                <BsFillGearFill className='icon'/> Settings
           </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to={'/lockscreen'} >
                
                <FaLock className='icon'/> Lockscreen
           </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar