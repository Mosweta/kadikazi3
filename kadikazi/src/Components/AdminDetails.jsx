import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminDetails = () => {
    const [userId, setUserId] = useState();
    const [adminValues, setAdminValues] = useState({
        fName: '',
        lName: '',
        Address: '',
        Telephone: '',
        Gender: '',
        Specialty: '',
        EmailAddress: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
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
        axios.get(`http://localhost:8081/readAdmin/${userId}`)
            .then(res => {
                const adminData = res.data[0];
                setAdminValues({
                    fName: adminData.fName,
                    lName: adminData.lName,
                    Address: adminData.Address,
                    Telephone: adminData.Telephone,
                    Gender: adminData.Gender,
                    EmailAddress: adminData.EmailAddress
                });
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to fetch admin details');
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateAdmin/${id}`, adminValues)
            .then(res => {
                console.log(res);
                navigate('/manageAdmins');
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to update admin details');
            });
    };
  return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items center'>
           <div className='w-200 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Personal Details</h2>
    
                    <div class="mb-2">
                        <label>First Name</label>
                        <input type="text"  onChange={(e) => setAdminvalues({ ...adminValues, fName: e.target.value })} className="form-control"/>
                    </div>
                    <div class="mb-3">
                    <label>Last Name</label>
                        <input type="text"  onChange={(e) => setAdminvalues({ ...adminValues, lName: e.target.value })} className="form-control"/>
                    </div>
                    <div class="mb-3">
                    <label>Physical Address</label>
                        <input type="text"  onChange={(e) => setAdminvalues({ ...adminValues, Address: e.target.value })} className="form-control"/>
                    </div>
                    <div class="mb-3">
                    <label>Telephone Number</label>
                        <input type="text"  onChange={(e) => setAdminvalues({ ...adminValues, Telephone: e.target.value })} className="form-control"/>
                    </div>
                    <div class="mb-3">
                    <label>Gender</label>
                        <input type="text" c onChange={(e) => setAdminvalues({ ...adminValues, Gender: e.target.value })} className="form-control"/>
                    </div>
                    <div class="mb-3">
                    <label>Email Address</label>
                        <input type="text"  onChange={(e) => setAdminvalues({ ...adminValues, EmailAddress: e.target.value })} className="form-control"/>
                    </div>
    
                    {message && <div className="mb-2 alert alert-info">{message}</div>}
                    
                    <div class="mb-3">
                        <button type="submit"  class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )
    }
 

export default AdminDetails