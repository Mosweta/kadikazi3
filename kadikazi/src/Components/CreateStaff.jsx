import React,{useState}from 'react'
import { useNavigate,Link } from 'react-router-dom'; 
import axios from 'axios';
const Create = () => {
    const [staffValues, setStaffvalues] = useState({
        fName: '',
        lName: '',
        Address: '',
        Telephone:'',
        Gender:'',
        Specialty:'',
        EmailAddress:''
    });
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        // Check if email already exists
        axios.post('http://localhost:8081/check-staffEmail', { EmailAddress: staffValues.EmailAddress })
            .then(res => {
                if (res.data.exists) {
                    setMessage('Email already exists');
                } else {
                  //   Proceed with registration
                    axios.post('http://localhost:8081/registerStaff', staffValues)
                        .then(res => console.log(res)
                           
                        )
                        .catch(err => {
                            console.error(err);
                            setMessage('An error occurred. Please try again.');
                        });
                }
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred. Please try again.');
            });
    };
    
    
    
  return (
    <div className='d-flex  justify-content-center align-items center'>
       <div className='w-200 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
            <Link to={'/manageStaff'} style={{color:'black', textDecoration:'none',fontWeight:'bold', fontSize:'20px', marginLeft:'550px'}}>X</Link>
                <h2 style={{color:'black'}}>Add Staff</h2>

                <div class="mb-2">
                    <label style={{color:'black'}} >First Name</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, fName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Last Name</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, lName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Physical Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Address: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Telephone Number</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Telephone: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Gender</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Gender: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Specialty</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Specialty: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label style={{color:'black'}}>Email Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, EmailAddress: e.target.value })} class="form-control"/>
                </div>
                {message && <div className="mb-2 alert alert-info">{message}</div>}
                <div class="mb-3">
                    <button type="submit" name="updateStaff" class="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create