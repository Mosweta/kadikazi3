
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import Header from'./Header'
import  DataTable  from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
const ManageStaff = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
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
          const filtered = data.filter(staff =>
              staff.fName.toLowerCase().includes(value) ||
              staff.lName.toLowerCase().includes(value) ||
              staff.EmailAddress.toLowerCase().includes(value)
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
      axios.get('http://localhost:8081/getAllStaff')
        .then(res => setData(res.data))
        .catch(err => setError(err.message));
    }, []);
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8081/deleteStaff/`+id)
      .then(() => {
        setData(prevData => prevData.filter(staff => staff.StaffId !== id));
    })
    .catch(err => {
        setError(err.message);
        console.log('Error deleting data:');
    });
};
    const StaffColumn = [
      
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
        name: 'Address',
        selector: row => row.Address,
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
    ];
  
    return (
      // <div className='grid-container1'>
      // <Header/>
      // <Sidebar/>
      // <div className='table table-striped' >
      //       <h3>Staff Data</h3>
      //       <div className='text-end' > <label htmlFor="">Search: </label><input type="text" /></div>
      //       <DataTable
      //         columns={StaffColumn} // Assuming the columns are similar, otherwise define ClientColumn
      //         data={data}
      //         pagination
              
      //       />
      //     </div>
      //     </div>
      <div className='d-flex  justify-content-center align-items-center '>
        <div className='w-100 bg-white rounded p-3'>
              <h2>Staff Page</h2>
              {error && <p className='text-danger'>{error}</p>}
              <div className='d-flex justify-content-end'>
              <label htmlFor="" style={{ color: "black", fontWeight:'bold', fontSize:'20px' }}>Search:</label>
              <input type="text" onChange={handleFilter} />
                <Link to='/createStaff' className='btn btn-success'>create +</Link>
              </div>
              <table className='table table-striped table-hover'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Address</th>
                          <th>Telephone</th>
                          <th>Gender</th>
                          <th>Specialty</th>
                          <th>Email Address</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((staff, index) => {
                      return <tr key={index}>
                          <td>{staff.StaffId}</td>
                          <td>{staff.fName}</td>
                          <td>{staff.lName}</td>
                          <td>{staff.Address}</td>
                          <td>{staff.Telephone}</td>
                          <td>{staff.Gender}</td>
                          <td>{staff.Specialty}</td>
                          <td>{staff.EmailAddress}</td>
                          <td>
                            
                            <Link to={`/editStaff/${staff.StaffId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button onClick={() => handleDelete(staff.StaffId)} className='btn btn-sm btn-danger'>Delete</button>
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
      </div>
    );
}

export default ManageStaff