import axios from 'axios';
import './App.css'

import React, { useEffect, useState } from 'react'

const App = () => {

  let [employees , setEmployees] = useState([]);

  let [employee , setEmployee] = useState({
    name:'',
    role:'',
    salary:''
  });


  let [b , setB] = useState(false);
  // promise functions (then and catch)



 //Read
     const getEmployee = () =>{ 
      axios.get("http://localhost:3000/employees").then((res)=>{
     // console.log("response:" , res);
     console.log("response:" , res.data);

     setEmployees(res.data);
    
    }).catch((err)=>{
      console.log("Error from get" ,err);
    })}
   
  useEffect(() =>{
    getEmployee();
  } ,[]);
  
  //Delete

  const handleDelete = (id) =>{
        axios.delete("http://localhost:3000/employees/" + id).then((res)=>{
          console.log("Delete operation successfully..!");
          getEmployee();
        }).catch((err)=>{

          console.log("Error from delete" ,err , id);
        })
  }

  const handleChange = (e) =>{
    const {name , value} = e.target;

    setEmployee({...employee , [name] : value});
  }

  const clearForm = () =>{
    setEmployee({
       name:'',
    role:'',
    salary:''
    })
  }

  

  //update
  
  const handleUpdate = (e)=>{
    setEmployee(e);
    setB(true);
  }

  const handleSubmit = async (e) =>{

    e.preventDefault();
// Create

if(b){

   await axios.put(`http://localhost:3000/employees/${employee.id}`,employee).then((res)=>{

          console.log("update operation successfully..!");
         
        }).catch((err)=>{

          console.log("Error from update" ,err );
        })
  

}else{

await axios.post("http://localhost:3000/employees" , employee).then((res)=>{
          console.log("add operation successfully..!");
         
        }).catch((err)=>{

          console.log("Error from add" ,err );
        })
  }
       getEmployee();
          clearForm();

          setB(false);
}
    

  return (
    <div>
      <center>

       <h2>{(b) ? "Update Employee" : "Login Employee"} </h2>
       <form onSubmit={handleSubmit}>
       Name:<input type="text" name="name" value={employee.name} onChange={handleChange} required/><br/><br/>
       Role:<input type="text" name="role" value={employee.role} onChange={handleChange} required/><br/><br/>
       salary:<input type="text" name="salary" value={employee.salary} onChange={handleChange} required/><br/><br/>

       <button type="submit">{(b) ? "Update" : "Add"}</button>
       </form>

     <h2>Employee Table</h2>

     <table border={2}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Salary</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {employees.map((e)=>(
           <tr key={e.id}>
          <td>{e.name}</td>
           <td>{e.role}</td>
            <td>{e.salary}</td>
            <td>
              <button type="button" onClick={()=>handleDelete(e.id)}>Delete</button>{" "}
               <button type="button" onClick={()=>handleUpdate(e)}>Update</button>
            </td>
        </tr>
        ))}
       
      </tbody>
     </table>
      
      
     </center>



      
    </div>
  )
}

export default App;
