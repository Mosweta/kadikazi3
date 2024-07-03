import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8081/getAllUsers')
      .then(res => setData(res.data))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    setFilteredData(data);
    setPageCount(Math.ceil(data.length / 10));
    setCurrentPageData(data.slice(0, 10));
  }, [data]);

  useEffect(() => {
    const filtered = data.filter(users =>
      users.Name.toLowerCase().includes(searchTerm) ||
      users.EmailAddress.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setPageCount(Math.ceil(filtered.length / 10));
    setCurrentPageData(filtered.slice(0, 10));
  }, [searchTerm, data]);

  const handleFilter = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * 10;
    setCurrentPageData(filteredData.slice(offset, offset + 10));
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='w-100 bg-white rounded p-3'>
        <h2>Users Page</h2>
        {error && <p className='text-danger'>{error}</p>}
        <div className='d-flex justify-content-end'>
          <label htmlFor="search" style={{ color: "black", fontWeight: 'bold', fontSize: '20px' }}>Search:</label>
          <input type="text" id="search" onChange={handleFilter} />
          <Link to='/createUser' className='btn btn-success'>Create +</Link>
        </div>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((users, index) => (
              <tr key={index}>
                <td>{users.userId}</td>
                <td>{users.Name}</td>
                <td>{users.EmailAddress}</td>
                <td>{users.userType}</td>
                <td>
                  <Link to={`/editUser/${users.userId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                  <button className='btn btn-sm btn-danger'>Delete</button>
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
    </div>
  );
};

export default UsersPage;
