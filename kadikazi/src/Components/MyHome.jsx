import React, { useEffect, useState, useRef } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { FaUsersCog, FaUserShield, FaAddressBook } from 'react-icons/fa';
import { MdOutlinePayment,MdLocalCarWash } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { PiUsersThreeFill } from "react-icons/pi";
import { PieChart } from 'react-minimal-pie-chart';
import { BarChart,Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function MyHome() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalActiveUsers, setTotalActiveUsers] = useState(null);
  const [totalInactiveUsers, setTotalInactiveUsers] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(null);
  const [totalClients, setTotalClients] = useState(null);
  const [totalStaff, setTotalStaff] = useState(null);
  const [newBookings, setNewBookings] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalCars, setTotalCars] = useState(null);
  const [totalWashes, setTotalWashes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          adminResponse,
          clientResponse,
          staffResponse,
          userResponse,
          totalUsersResponse,
          totalActiveUsersResponse,
          totalInactiveUsersResponse,
          totalAdminsResponse,
          totalClientsResponse,
          totalStaffResponse,
          newBookingsResponse,
          totalAmountResponse,
          totalCarsResponse,
          totalWashesResponse
        ] = await Promise.all([
          axios.get('http://localhost:8081/getAllAdmins'),
          axios.get('http://localhost:8081/getAllClients'),
          axios.get('http://localhost:8081/getAllStaff'),
          axios.get('http://localhost:8081/getAllUsers'),
          axios.get('http://localhost:8081/totalUsers'),
          axios.get('http://localhost:8081/totalActiveUsers'),
          axios.get('http://localhost:8081/totalInactiveUsers'),
          axios.get('http://localhost:8081/totalAdmins'),
          axios.get('http://localhost:8081/totalClients'),
          axios.get('http://localhost:8081/totalStaff'),
          axios.get('http://localhost:8081/newBookings'),
          axios.get('http://localhost:8081/totalPayments'),
          axios.get('http://localhost:8081/totalCars'),
          axios.get('http://localhost:8081/totalWashes'),
        ]);

        setAdminData(adminResponse.data);
        setClientData(clientResponse.data);
        setStaffData(staffResponse.data);
        setUserData(userResponse.data);
        setTotalUsers(totalUsersResponse.data.totalUsers);
        setTotalActiveUsers(totalActiveUsersResponse.data.totalActiveUsers);
        setTotalInactiveUsers(totalInactiveUsersResponse.data.totalInactiveUsers);
        setTotalAdmins(totalAdminsResponse.data.totalAdmins);
        setTotalClients(totalClientsResponse.data.totalClients);
        setTotalStaff(totalStaffResponse.data.totalStaff);
        setNewBookings(newBookingsResponse.data.newBookings);
        setTotalAmount(totalAmountResponse.data.totalAmount);
        setTotalCars(totalCarsResponse.data.totalCars);
        setTotalWashes(totalWashesResponse.data.totalWashes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const AdminColumn = [
    { name: 'ID', selector: row => row.adminId, sortable: true },
    { name: 'First Name', selector: row => row.fName, sortable: true },
    { name: 'Last Name', selector: row => row.lName, sortable: true },
    { name: 'Telephone', selector: row => row.Telephone, sortable: true },
    { name: 'Gender', selector: row => row.Gender, sortable: true },
    { name: 'Email Address', selector: row => row.EmailAddress, sortable: true },
  ];

  const StaffColumn = [
    { name: 'ID', selector: row => row.staffId, sortable: true },
    { name: 'First Name', selector: row => row.fName, sortable: true },
    { name: 'Last Name', selector: row => row.lName, sortable: true },
    { name: 'Address', selector: row => row.Address, sortable: true },
    { name: 'Telephone', selector: row => row.Telephone, sortable: true },
    { name: 'Gender', selector: row => row.Gender, sortable: true },
    { name: 'Email Address', selector: row => row.EmailAddress, sortable: true },
  ];

  const UsersColumn = [
    { name: 'ID', selector: row => row.userId, sortable: true },
    { name: 'Name', selector: row => row.Name, sortable: true },
    { name: 'Email Address', selector: row => row.EmailAddress, sortable: true },
    { name: 'User Type', selector: row => row.userType, sortable: true },
  ];

  const ClientColumn = [
    { name: 'ID', selector: row => row.clientId, sortable: true },
    { name: 'First Name', selector: row => row.client_fName, sortable: true },
    { name: 'Last Name', selector: row => row.client_lName, sortable: true },
    { name: 'Address', selector: row => row.client_pAddress, sortable: true },
    { name: 'Telephone', selector: row => row.client_telephoneNo, sortable: true },
    { name: 'Gender', selector: row => row.client_gender, sortable: true },
    { name: 'Email Address', selector: row => row.client_emailAddress, sortable: true },
    { name: 'CarRegNo', selector: row => row.carRegistrationNo, sortable: true },
  ];

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    
];
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Users</h3>
            <PiUsersThreeFill onClick={() => toggleMenu('user')} className='card_icon' />
          </div>
          {totalUsers !== null ? <h2>{totalUsers}</h2> : <p>Loading...</p>}
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>Admins</h3>
            <FaUsersCog onClick={() => toggleMenu('admin')} className='card_icon' />
          </div>
          {totalAdmins !== null ? <h2>{totalAdmins}</h2> : <p>Loading...</p>}
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>Clients</h3>
            <BsPeopleFill onClick={() => toggleMenu('client')} className='card_icon' />
          </div>
          {totalClients !== null ? <h2>{totalClients}</h2> : <p>Loading...</p>}
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Staff</h3>
            <FaUserShield onClick={() => toggleMenu('staff')} className='card_icon' />
          </div>
          {totalStaff !== null ? <h2>{totalStaff}</h2> : <p>Loading...</p>}
        </div>
        <div  style={{backgroundColor:'green'}} className='card'>
          <div className='card-inner'>
            <h3>Bookings</h3>
            <FaAddressBook onClick={() => toggleMenu('client')} className='card_icon' />
          </div>
          {newBookings !== null ? <h2>{newBookings}</h2> : <p>Loading...</p>}
        </div>
        <div  style={{backgroundColor:'red'}} className='card'>
          <div className='card-inner'>
            <h3>Payments</h3>
            <MdOutlinePayment onClick={() => toggleMenu('client')} className='card_icon' />
          </div>
          {totalAmount !== null ? <h2>{totalAmount}</h2> : <p>Loading...</p>}
        </div>
        <div style={{backgroundColor:'yellow'}} className='card'>
          <div className='card-inner'>
            <h3>Cars</h3>
            <IoCarSport onClick={() => toggleMenu('client')} className='card_icon' />
          </div>
          {totalCars !== null ? <h2>{totalCars}</h2> : <p>Loading...</p>}
        </div>
        <div   className='card'>
          <div className='card-inner'>
            <h3>Cars Washed</h3>
            <MdLocalCarWash onClick={() => toggleMenu('client')} className='card_icon' />
          </div>
          {totalWashes !== null ? <h2>{totalWashes}</h2> : <p>Loading...</p>}
        </div>
        
      </div>

      {openMenu === 'user' && (
        <div className='sub-menu-wrap'>
          <h3>User Data</h3>
          <DataTable columns={UsersColumn} data={userData} pagination />
        </div>
      )}

      {openMenu === 'admin' && (
        <div className='sub-menu-wrap'>
          <h3>Admin Data</h3>
          <DataTable columns={AdminColumn} data={adminData} pagination />
        </div>
      )}

      {openMenu === 'client' && (
        <div className='sub-menu-wrap'>
          <h3>Client Data</h3>
          <DataTable columns={ClientColumn} data={clientData} pagination />
        </div>
      )}

      {openMenu === 'staff' && (
        <div className='sub-menu-wrap'>
          <h3>Staff Data</h3>
          <DataTable columns={StaffColumn} data={staffData} pagination />
        </div>
      )}

<div className='charts'>
      <div style={{ width: '80%', height: '80%', margin: '0 auto' }}>
        
        <PieChart
          
          data={[
            { title: `Active Users: ${totalActiveUsers}`, value: totalActiveUsers, color: '#E38627' },
            { title: `Inactive Users: ${totalInactiveUsers}`, value: totalInactiveUsers, color: 'blue' },
          ]}
          style={{
            height: '400px',
          }}
          animate
          animationDuration={500}
          animationEasing="ease-out"
          radius={42}
          label={({ dataEntry }) => `${dataEntry.title}`}
          labelPosition={75}
          labelStyle={{
            fontSize: '5px',
            fontColor: 'FFFFFA',
            fontWeight: '800',
          }}
        />
      </div>
    </div>
      
    
    </main>
  );
}

export default MyHome;

