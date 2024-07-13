import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import  DataTable  from 'react-data-table-component';
import './MyHome.css'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import ReactPaginate from 'react-paginate';
const ManageBookings = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [userId, setUserId]=useState('');
    const [message, setMessage]=useState('');
    
      const [currentPageData, setCurrentPageData] = useState(data);
      const [filteredData, setFilteredData] = useState(data);
      const [pageCount, setPageCount] = useState(Math.ceil(data.length / 10));
      const [searchTerm, setSearchTerm] = useState("");
  
      useEffect(() => {
          setFilteredData(data);
          setPageCount(Math.ceil(data.length / 10));
      }, [data]);
  
      const handleFilter = (event) => {
          const value = event.target.value.toLowerCase();
          setSearchTerm(value);
          const filtered = data.filter(admin =>
              admin.fName.toLowerCase().includes(value) ||
              admin.lName.toLowerCase().includes(value) ||
              admin.EmailAddress.toLowerCase().includes(value)
          );
          setFilteredData(filtered);
          setPageCount(Math.ceil(filtered.length / 10));
      };
  
      const handlePageClick = (data) => {
          const selectedPage = data.selected;
          const offset = selectedPage * 10;
          setCurrentPageData(filteredData.slice(offset, offset + 10));
      };
  
      useEffect(() => {
          setCurrentPageData(filteredData.slice(0, 10));
      }, [filteredData]);
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
        axios.get('http://localhost:8081/getAllBookings')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    const handlePayment =(id) =>{
      
      axios.post(`http://localhost:8081/stk/`+id)
      .then(() => {
        window.alert('Payment Successful');
    })
    .catch(err => {
        setError(err.message);
        console.log('Payment Error');
    });}
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deleteBooking/`+id)
        .then(() => {
          setData(prevData => prevData.filter(booking => booking.BookingId !== id));
      })
      .catch(err => {
          setError(err.message);
          console.log('Error deleting data:');
      });}
    
      
    if (loading) {
        return <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                <h2>Loading...</h2>
            </div>
        </div>;
    }
    const AdminColumn = [
        
        {
          name: 'First Name',
          selector: row => row.fName,
          sortable: true,
        },
        {
          name: 'Last Name',
          selector: row => row.lName,
          sortable: true,
        },
        {
          name: 'Telephone',
          selector: row => row.Telephone,
          sortable: true,
        },
        {
          name: 'Gender',
          selector: row => row.Gender,
          sortable: true,
        },
        {
          name: 'Email Address',
          selector: row => row.EmailAddress,
          sortable: true,
        },
        {
            name: 'Action',
            
          },
      ];

    return (
        
        // <div className="grid-container1">
        //     <Header/>
        //     <Sidebar/>
            
        
        //     <div className='container mt-5'>
        //     <h3>Admin Data</h3>
        //     <div className='text-end' > <label htmlFor="">Search</label><input type="text" /></div>
        //     <DataTable
        //       columns={AdminColumn} // Assuming the columns are similar, otherwise define ClientColumn
        //       data={data}
        //       pagination
              
        //     />
        //   </div>
        //   </div>
        
        
        <div className='w-100 bg-white rounded p-3'>
        <h2 style={{ color: "black" }}>Manage Booking</h2>
        {error && <p className='text-danger'>{error}</p>}
        <div className='d-flex justify-content-end mb-3'>
            <label htmlFor="" style={{ color: "black", fontWeight:'bold', fontSize:'10px' }}>Search:</label>
            <input type="text" onChange={handleFilter} />
            
        </div>
        <table className='table table-striped table-hover'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Telephone</th>
                    <th>Plan</th>
                    <th>user Id</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentPageData.map((booking) => (
                    <tr key={booking.BookingId}>
                        <td>{booking.BookingId}</td>
                        <td>{booking.Name}</td>
                        <td>{booking.Telephone}</td>
                        <td>{booking.WashType}</td>
                        <td>{booking.client_Id}</td>
                        <td>{booking.Status}</td>
                        <td>{booking.Date}</td>
                        <td>{booking.Time}</td>

                        
                        <td>
                            <Link to={`/editBooking/${booking.BookingId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button onClick={() => handleDelete(booking.BookingId)} style={{border:'20px'}} className='btn btn-sm btn-danger'>Delete</button>
                            <button onClick={() => handlePayment(booking.BookingId)} style={{border:'20px'}} className='btn btn-sm btn-danger'>Pay</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
    </div>
);
};
export default ManageBookings;
