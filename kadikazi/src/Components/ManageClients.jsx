import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import  DataTable  from 'react-data-table-component';
import Header from "./Header"
import Sidebar from './Sidebar'
import ReactPaginate from 'react-paginate';

const ManageClients = () => {

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
      axios.get('http://localhost:8081/getAllClients')
        .then(res => setData(res.data))
        .catch(err => setError(err.message));
    }, []);
    useEffect(() => {
        setFilteredData(data);
        setPageCount(Math.ceil(data.length / 10));
    }, [data]);

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = data.filter(client =>
          client.client_fName.toLowerCase().includes(value) ||
            client.client_lName.toLowerCase().includes(value) ||
            client.client_emailAddress.toLowerCase().includes(value)
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
  
    
    const ClientColumn = [
      {
        name: 'ID',
        selector: row => row.clientId,
        sortable: true,
      },
      {
        name: 'First Name',
        selector: row => row.client_fName,
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: row => row.client_lName,
        sortable: true,
      },
      {
        name: 'Address',
        selector: row => row.client_pAddress,
        sortable: true,
      },
      {
        name: 'Telephone',
        selector: row => row.client_telephoneNo,
        sortable: true,
      },
      {
        name: 'Gender',
        selector: row => row.client_gender,
        sortable: true,
      },
      {
        name: 'Email Address',
        selector: row => row.client_emailAddress,
        sortable: true,
      },
      {
        name: 'CarRegNo',
        selector: row => row.carRegistrationNo,
        sortable: true,
      },
    ];
    return (
      // <div className='grid-container1' >
      //   <Header/>
      //   <Sidebar/>
      //   <div className='container mt-5'>
      //       <h3>Client Data</h3>
      //       <div className='text-end' > <label htmlFor="">Search</label><input type="text" /></div>
      //       <DataTable
      //         columns={ClientColumn} // Assuming the columns are similar, otherwise define ClientColumn
      //         data={data}
      //         pagination
              
      //       />
      //     </div>
      //     </div>
      <div className=' w-100 bg-white rounded p-3'>
              <h2 style={{color: 'black'}}>Clients Page</h2>
              {error && <p className='text-danger'>{error}</p>}
              <div className='d-flex justify-content-end'>
              <label htmlFor="" style={{ color: "black", fontWeight:'bold', fontSize:'20px' }}>Search:</label>
              <input type="text" onChange={handleFilter} />
                <Link to='/createClient' className='btn btn-success'>create +</Link>
              </div>
              <table style={{overflowX: 'scroll'}} className='table table-striped table-hover'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Gender</th>
                          <th>Address</th>
                          <th>RegistrationNo</th>
                          <th>Telephone</th>
                          <th>Primary Email Address</th>
                          {/* <th>Secondary Email Address</th> */}
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((client, index) => {
                      return <tr key={index}>
                          <td>{client.clientId}</td>
                          <td>{client.client_fName}</td>
                          <td>{client.client_lName}</td>
                          <td>{client.client_gender}</td>
                          <td>{client.client_pAddress}</td>
                          <td>{client.carRegistrationNo}</td>
                          <td>{client.client_telephoneNo}</td>
                          <td>{client.client_emailAddress}</td>
                          {/* <td>{client.client_sEmailAddress}</td> */}
                          <td>
                            
                            <Link to={`/editClient/${client.clientId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button className='btn btn-sm btn-danger '>Delete</button>
                          </td>
                      </tr>
                    })}
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
}

export default ManageClients