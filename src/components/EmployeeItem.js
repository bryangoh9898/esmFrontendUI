import Card from '../UI/Card';
import './EmployeeItem.css';
import * as FaIcons from 'react-icons/fa'
import React, { useState } from "react";


function EmployeeItem(props){
  const [inputName, setInputName] = useState('');
  const [inputLogin, setInputLogin] = useState('');
  const [inputSalary, setInputSalary] =  useState('');
  const [popUp, setPopUp] = useState(false);
  const[deletePopUp, setDeletePopUp] = useState(false);

  function deleteUser(){
      //Fetch num of total document count (Without filter)
    
    fetch("http://localhost:5000/users/" + props.id, {
        method: "DELETE"
    })
    .then((res) =>{
        console.log(res);
        if(res.status == 200){
          console.log("Delete successful")
          props.submitHandler()
        }
        else{
          console.log("Error in deleting")
        }
    })

  }

  function updateUser(){

    //Fill in everything please
    if(inputName == "" || inputLogin == "" || inputSalary == ""){
      alert("Please enter all fields")
      return
    }

    const objBody = {
      "name" : inputName,
      "login" : inputLogin,
      "salary" : inputSalary
    }

    fetch("http://localhost:5000/users/" + props.id, {
        method: "PUT",
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(objBody)
    })
    .then((res) =>{
        console.log(res);
        if(res.status == 200){
          console.log("Update successful")
          props.submitHandler()
          togglePop()
        }
        else{
          console.log("Error in deleting")
        }
    })

  }

  const handleInputName = event => {
    setInputName(event.target.value);
  }

  const handleInputLogin = event => {
    setInputLogin(event.target.value);
  }

  const handleInputSalary = event => {
    setInputSalary(event.target.value);
  }


  const togglePop = () =>{
    setPopUp(!popUp) 
  }
  
  const toggleDeletePopUp = () => {
    setDeletePopUp(!deletePopUp)
  }

  if(popUp || deletePopUp){
    document.body.classList.add('active-popUp')
  }
  else{
    document.body.classList.remove('active-popUp')
  }



   return(
    <li>
    <Card className = "employee-item">
      <div className = "column-wrapper">{props.id}</div>
      <div className = "column-wrapper">{props.login}</div>
      <div className = "column-wrapper">{props.name}</div>
      <div className = "column-wrapper">{props.salary}</div>
      <div className = "column-wrapper">
        <FaIcons.FaPencilAlt onClick = {togglePop} style = {{marginRight : "10px"}}></FaIcons.FaPencilAlt>
        <FaIcons.FaTrash onClick = {toggleDeletePopUp} ></FaIcons.FaTrash>
      </div>
    </Card>

    {deletePopUp && (
    <div className = "popUp">
      <div className = "overlay">
        <div className = "pop-content">
            <h2>Delete Item?</h2>
            <p>Are you sure you want to delete Employee with ID {props.id}?
              This will an irreversible action
            </p>
            <button className = "action" onClick = {deleteUser}>Confirm</button>
            <button className = "action" onClick = {toggleDeletePopUp}>Cancel</button>
            <button className = "close-pop" onClick = {toggleDeletePopUp}>Close</button>
        </div>
      </div>
    </div>
    )}


    {popUp && (
    <div className = "popUp">
    <div className = "overlay">
        <div className = "pop-content">
            <h2>Edit</h2>
            <hr style = {{marginTop: "5px", marginBottom: "5px"}}/>
            <p>Employee ID: {props.id}</p>
            <ul className = "edit-list-wrapper">
              <li ><input type = "text" placeholder= "Name" className = "edit-input-wrapper" value = {inputName} onChange = {handleInputName}></input></li>
              <li ><input type = "text" placeholder="Login" className = "edit-input-wrapper" value = {inputLogin} onChange = {handleInputLogin}></input></li>
              <li ><input type = "number" min = "0" placeholder = "Salary" className = "edit-input-wrapper" value = {inputSalary} onChange = {handleInputSalary}></input></li>
            </ul>
            <button className = "close-pop" onClick = {togglePop}>Close</button>
            <button className = "action" onClick = {updateUser}>Save</button>
        </div>
    </div>
  </div>
    )}

    
    </li>
   )

}

export default EmployeeItem;