import './EmployeeList.css';
import Select from 'react-select';
import React, { useState, useReducer, useEffect} from 'react';
import EmployeeItem from './EmployeeItem';
import ReactPaginate from 'react-paginate';
import Card from '../UI/Card';

function EmployeeList(){

    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedSortValue, setSelectedSortValue] = useState(null);
    const [inputMinValue, setInputMinvalue] = useState('');
    const [inputMaxValue, setInputMaxValue] = useState('');
    const [inputValue, setValue] = useState('');
    const [userCount, setUserCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentActivePage, setCurrentActivePage] = useState(-1);
    const [emptyResult, setEmptyResult] = useState(null);
    const numRecordForPage = 30;

    const actions = [
        {label: "Id" , value: 1},
        {label: "Login", value: 2},
        {label: "Name", value:3},
        {label: "Salary", value: 4}
    ]

    const sortActions = [
        {label: "+", value: 1},
        {label: "-", value: 2}
    ]

    const handleEmptyResult = value => {
        setEmptyResult(value);
    }

    const handleUser = value => {
        setUsers(value);
    }

    const handleCurrentActivePage = value => {
        setCurrentActivePage(value);
    }

    const handleSortChange = value => {
        setSelectedSortValue(value);
    }

    const handlePageCount = value => {
        setPageCount(value);
    }

    const handleUserCount = value => {
        setUserCount(value);
    }
        
    const handleChange = value => {
        setSelectedValue(value);
    }

    const handleInputMinChange = event => {
        setInputMinvalue(event.target.value);
    }

    const handleInputMaxChange = event => {
        setInputMaxValue(event.target.value);
    }
    
    const [test, setTests] = useState("");

    const saveTestDataHandler = (enteredNewTestData) =>{
        setTests(enteredNewTestData);
    }

    //Retrieves the paginated pages employee records from database
    const handlePageClick = (e) => {    
        var url = "http://localhost:5000/users?minSalary=" + inputMinValue + "&maxSalary=" +
        inputMaxValue + "&offset=" +  (e.selected) * numRecordForPage + "&limit=" + numRecordForPage+ "&sort=" + encodeURIComponent(selectedSortValue["label"])+ selectedValue["label"].toLowerCase()
        // console.log(
        //     `User requested page number ${e.selected}, which is offset ${(e.selected) *numRecordForPage}`
        //   );
        handleCurrentActivePage(e.selected)

        fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
        })
        .then((res) => {
            if (res.status == 400) {
                alert("Invalid Input");
            }
            return res.json()
            }, function (e) {
                alert("Error submitting form!");
        })
        .then(data => {
                setIsLoading(false)
                handleUser(data)
        });
    };

    //Searches and return first page of user search
    function submitHandler(){

        if(selectedSortValue == null || selectedValue == null || inputMinValue == '' || inputMaxValue == ''){
            alert("Please select all fields")
            return
        }

        //Call the api now - Show user loading 
        setIsLoading(true)

        //Fetch num of total document count - To determine how many pages for tthe reult to use in pagination
        fetch("http://localhost:5000/users/employeeRecords/count?maxSalary=" + inputMaxValue + "&minSalary=" + inputMinValue , {
            method: "GET",
        })
        .then((res) =>{
            return res.json();
        }).then(data => {
            handleUserCount(data);
            handlePageCount(Math.ceil(data/numRecordForPage));
            //We want to refressh the pagination
            handleCurrentActivePage(0)
        })

        //Make the URL here
        var url = "http://localhost:5000/users?minSalary=" + inputMinValue + "&maxSalary=" +
        inputMaxValue + "&offset=0&limit=" + numRecordForPage + "&sort=" + encodeURIComponent(selectedSortValue["label"])+ selectedValue["label"].toLowerCase()
        //Fetch the relevant data
        fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
        })
        .then((res) => {
            if(res.status == 400) {
                res.json().then((data) => {
                    saveTestDataHandler(data["error"]);
                    return {}
                })
            }
            return res.json()
            }, function (e) {
                alert("Error submitting form!");
        })
        .then(data => {
                //If not result, then we want to display message
                setIsLoading(false)
                
                if(data.length > 0){
                    handleEmptyResult(false)
                }
                else{
                    handleEmptyResult(true)
                }
                
                handleUser(data)

        });
    };
    
    return(
        <div className = "container">
            <div className = "input-wrapper">
                <div className = "dd-wrapper">
                    <label className ="input-field-wrapper">Min Salary: </label>
                    <input className = "input-filter-wrapper" type = "number" min = "0" placeholder="Enter Minimum Salary Range" value = {inputMinValue}  onChange = {handleInputMinChange}></input>
                </div>
                <div className = "dd-wrapper">
                <label className = "input-field-wrapper">Max Salary: </label>
                <input className = "input-filter-wrapper" type = "number" min = "0" placeholder="Enter Maximum Salary Range" value = {inputMaxValue} onChange = {handleInputMaxChange}></input>
                </div>
            </div>
            
        
            <div className = "dd-wrapper-fix">
                <label className = "field-wrapper">Sort:</label>
                <div className = "filter-wrapper">
                <Select options = {actions} value = {selectedValue} onChange = {handleChange} isLoading={isLoading}></Select>
                </div>
                <div className = "sort-wrapper">
                <Select options = {sortActions} value = {selectedSortValue}  onChange = {handleSortChange} isLoading={isLoading}></Select>
                </div>
                <button style = {{padding : "7px" , borderRadius: "4px", border: "1px solid lightgrey" , fontSize : "1rem", marginLeft: "15px"}}onClick={submitHandler}>Search</button>
            </div>  

            <ul className = "vertical-wrapper">
                <li>
                <Card className = "header">
                    <div className = "column-wrapper">ID</div>
                    <div className = "column-wrapper">LOGIN</div>
                    <div className = "column-wrapper">NAME</div>
                    <div className = "column-wrapper">SALARY</div>
                    <div className = "column-wrapper">ACTION</div>
                </Card>
                </li>
                {       
                    users.map(user => (
                        <EmployeeItem key = {user.id} id = {user.id} login = {user.login} name = {user.name} salary = {user.salary} submitHandler = {submitHandler}></EmployeeItem>
                    ))
                }
                
                { isLoading && (
                    <div>Loading...</div>
                )}

                { emptyResult && (
                <div>No results found!</div>
                )}  

                <li>
                <br/>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    renderOnZeroPageCount={null}
                    forcePage={currentActivePage}
                    activeClassName={"active"}/>
                </li>
                <br/>
                <br/>
            </ul>
        


        </div>
    )
}

export default EmployeeList