import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditClient = () => {
    const [clientValues, setClientValues] = useState({
        fName: '',
        lName: '',
        Address: '',
        CarRegistrationNo:'',
        Telephone: '',
        Gender: '',
        EmailAddress: '',
        SemailAddress: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8081/readClient/${id}`)
            .then(res => {
                const clientData = res.data[0];
                setClientValues({
                    fName: clientData.client_fName,
                    lName: clientData.client_lName,
                    Gender: clientData.client_gender,
                    Address: clientData.client_pAddress,
                    CarRegistrationNo: clientData.carRegistrationNo,
                    Telephone: clientData.client_telephoneNo,
                    
                    EmailAddress: clientData.client_emailAddress,
                    SemailAddress: clientData.client_sEmailAddress
                });
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to fetch client details');
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateClient/${id}`, clientValues)
            .then(res => {
                console.log(res);
                navigate('/manageClients');
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to update client details');
            });
    };

    return (
        <div className="d-flex  justify-content-center align-items-center">
            <div  className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                <Link to={'/manageClients'} style={{color:'black', textDecoration:'none',fontWeight:'bold', fontSize:'20px', marginLeft:'550px'}}>X</Link>
                    <h2 style={{color: 'black'}}>Update Client</h2>

                    <div className="mb-3">
                        <label style={{color: 'black'}}>First Name</label>
                        <input
                            type="text"  
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, fName: e.target.value })}
                            value={clientValues.fName}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, lName: e.target.value })}
                            value={clientValues.lName}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, Gender: e.target.value })}
                            value={clientValues.Gender}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Physical Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, Address: e.target.value })}
                            value={clientValues.Address}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Car Registration </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, CarRegistrationNo: e.target.value })}
                            value={clientValues.CarRegistrationNo}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Telephone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, Telephone: e.target.value })}
                            value={clientValues.Telephone}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, EmailAddress: e.target.value })}
                            value={clientValues.EmailAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{color: 'black'}}>Secondary Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setClientValues({ ...clientValues, SemailAddress: e.target.value })}
                            value={clientValues.SemailAddress}
                        />
                    </div>
                    {message && <div className="mb-2 alert alert-info">{message}</div>}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditClient;
