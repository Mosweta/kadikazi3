import React from 'react';
import { AuthProvider } from './Components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/Login';
import Register from './Components/LoginRegister/Register';
import Main from './Components/Main';
import Client from './Components/Client';
import Admin from './Components/Admin';
import Admin2 from './Components/Admin2';
import AdminProfile from './Components/AdminProfile';
import EditUser from './Components/EditUser';
import ManageStaff from './Components/ManageStaff';
import ManageClients from './Components/ManageClients';
import ManageAdmin from './Components/ManageAdmin';
import Staff from './Components/Staff';
import Users from './Components/Users';
import CreateAdmin from './Components/CreateAdmin';
import CreateStaff from './Components/CreateStaff';
import CreateClient from './Components/CreateClient';
import CreateUser from './Components/CreateUser';
import UpdateStaff from './Components/UpdateStaff';
import EditAdmin from './Components/EditAdmin';
import EditClient from './Components/EditClient';
import EditProfile from './Components/EditProfile';
import EditBooking from './Components/EditBooking';

import ResetPassword from './Components/ResetPassword/ResetPassword';
import PasswordGuidelines from './Components/LoginRegister/PasswordGuidelines';
import Plans from './Components/Plans';

import LockScreen from './Components/LoginRegister/Lockscreen';
import Activation from './Components/LoginRegister/Activation';

import About from './Components/About';
import Service from './Components/Service';
import Booking from './Components/Booking';
import ManageBookings from './Components/ManageBookings';
import Feedback from './Components/Feedback';


function App() {
  return (
    <AuthProvider>
      <Router> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/activate" element={<Activation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin2" element={<Admin2 />} />
          <Route path="/client" element={<Client />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/createStaff" element={<CreateStaff />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/editAdmin/:id" element={<EditAdmin />} />
          <Route path="/editClient/:id" element={<EditClient />} />
          <Route path="/editBooking/:id" element={<EditBooking />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editStaff/:id" element={<UpdateStaff />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="/lockscreen" element={<LockScreen />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/manageAdmins" element={<ManageAdmin />} />
          <Route path="/manageClients" element={<ManageClients />} />
          <Route path="/manageStaff" element={<ManageStaff />} />
          <Route path="/manageBookings" element={<ManageBookings />} />
          <Route path="/password" element={<PasswordGuidelines />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/service" element={<Service />} />
          <Route path="/users" element={<Users />} />
          
      
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
