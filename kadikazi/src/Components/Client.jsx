import React, { useEffect, useState, useRef } from 'react';
import Header2 from './Header2'
import Sidebar2 from './Sidebar2'
import axios from 'axios';
import './MyHome.css'

function Client() {
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
   <div className='grid-container'>
    <Header2/>
    <Sidebar2/>
    </div>
  );
}

export default Client;

