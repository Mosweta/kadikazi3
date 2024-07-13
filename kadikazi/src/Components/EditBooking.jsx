import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditClient = () => {
    const [bookingValues, setBookingValues] = useState({
        
        Status: ''
       
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8081/readBooking/${id}`)
            .then(res => {
                const BookingData = res.data[0];
                setBookingValues({
                    Name: BookingData.Name,
                    Telephone: BookingData.Telephone,
                    WashType: BookingData.WashType,
                    client_Id: BookingData.client_Id,
                    Status: BookingData.Status,
                    Date: BookingData.Date,
                    
                    Time: BookingData.Time,
                    BookingId: BookingData.BookingId
                });
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to fetch booking details');
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateBooking/${id}`, bookingValues)
            .then(res => {
                console.log(res);
                navigate('/manageBookings');
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to update booking details');
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className="d-flex  justify-content-center align-items-center">
            <div  className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                <Link to={'/manageBookings'} style={{color:'black', textDecoration:'none',fontWeight:'bold', fontSize:'20px', marginLeft:'550px'}}>X</Link>
                    <h2 style={{color: 'black'}}>Update Booking</h2>

                    <select
                            style={{ width: '350px', margin: '20px', height: '30px' }}
                            name="Status"
                            
                            onChange={handleChange}
                            required
                        >
                            <option value="">Booking Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            
                        </select>
                    
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
