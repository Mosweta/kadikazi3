import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = () => {
    const [message, setMessage] = useState('');
    const [bookingValues, setBookingValues] = useState({
        name: '',
        phone_number: '',
        service_offered: '',
        userId: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8081/home')
          .then(res => {
            if (res.data.Status === "Success") {
              setBookingValues(prevValues => ({ ...prevValues, userId: res.data.userId }));
            } else {
              setMessage(res.data.Error);
            }
          })
          .catch(err => {
            console.log(err);
            setMessage("An error occurred while fetching data.");
          });
      }, []);

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/book', bookingValues);
            if (response.data.Status === 'Success') {
                alert('Booking successful');
            } else {
                alert('Booking failed');
            }
        } catch (error) {
            console.error(error);
            alert('Data Send failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='w-70 bg-white rounded p-3'>
                <h2 style={{ color: 'black', marginLeft: '100px' }}>Book Appointment</h2>
                <form onSubmit={handleBooking}>
                    <input hidden name="userId" value={bookingValues.userId} type="text" readOnly />
                    <div>
                        <label style={{ color: 'black' }}>Name: </label>
                        <input
                            style={{ width: '340px', margin: '20px', marginLeft: '20px' }}
                            type="text"
                            name="name"
                            value={bookingValues.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Phone:</label>
                        <input
                            style={{ width: '340px', margin: '20px' }}
                            type="tel"
                            name="phone_number"
                            value={bookingValues.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Plan:</label>
                        <select
                            style={{ width: '350px', margin: '20px', height: '30px' }}
                            name="service_offered"
                            value={bookingValues.service_offered}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Plan</option>
                            <option value="Basic Clean">Basic Cleaning</option>
                            <option value="Premium Clean">Premium Cleaning</option>
                            <option value="Complex Clean">Complex Cleaning</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Date:</label>
                        <input
                            style={{ width: '350px', margin: '20px', height: '30px' }}
                            type="date"
                            name="date"
                            value={bookingValues.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Time:</label>
                        <input
                            style={{ width: '350px', margin: '20px', height: '30px' }}
                            type="time"
                            name="time"
                            value={bookingValues.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button style={{ backgroundColor: 'blue', color: 'white', margin: '20px' }} type="submit">
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Booking;
