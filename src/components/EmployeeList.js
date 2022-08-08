import './EmployeeList.css';
import Select from 'react-select';
import React, { useState, useReducer, useEffect} from 'react';
import EmployeeItem from './EmployeeItem';
import ReactPaginate from 'react-paginate';
import Card from '../UI/Card';

function EmployeeList(){

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [inputMinValue, setInputMinvalue] = useState('');
    const [inputMaxValue, setInputMaxValue] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState(null);
    const [currentPageValue, setCurrentPageValue] = useState(0);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleUser = value => {
        setUsers(value);
    }

    const handleCurrentPageValue = value => {
        setCurrentPageValue(value);
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

    const [reducer, forceUpdate] = useReducer( x => x+1,0)

    useEffect(() =>{
    }, [reducer])

    const handlePageClick = (e) => {
        console.log("ran")
        var url = "http://localhost:5000/users?minSalary=" + inputMinValue + "&maxSalary=" +
        inputMaxValue + "&offset=" +  (e.selected) * numRecordForPage + "&limit=30&sort=" + encodeURIComponent(selectedSortValue["label"])+ selectedValue["label"].toLowerCase()
        console.log(
            `User requested page number ${e.selected}, which is offset ${(e.selected) *numRecordForPage}`
          );
        fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
            })
            .then((res) => {
            console.log(res);
            console.log(res.status);
            //console.log(res.json());
            if (res.status == 200) {
                alert("Perfect! ");
            } else if (res.status == 400) {
                //res.json();
                alert("Invalid Input, please enter eveyrthing");
                // console.log(res.json().then());
                // console.log((res.json()))
                // res.json().then((data) => {
                //     //saveTestDataHandler(data["error"]);
                // })
            }
            return res.json()
            }, function (e) {
                alert("Error submitting form!");
            })
            .then(data => {
                setIsLoading(false)
                handleUser(data)
                handleCurrentPageValue(e.selected)
            });
            

    };

    function submitHandler(){
        console.log(inputMinValue);
        console.log(inputMaxValue);
        console.log(JSON.stringify(selectedValue || {} , null))
        //Make the URL here
        
        if(selectedSortValue == null || selectedValue == null || inputMinValue == null || inputMaxValue == null){
            alert("Pleaes select all fields")
            return
        }

        var url = "http://localhost:5000/users?minSalary=" + inputMinValue + "&maxSalary=" +
        inputMaxValue + "&offset=0&limit=30&sort=" + encodeURIComponent(selectedSortValue["label"])+ selectedValue["label"].toLowerCase()
        console.log(encodeURIComponent(selectedSortValue["label"]))
        console.log(url); 
        //Call the api now 
        setIsLoading(true)

        //Fetch num of count
        fetch("http://localhost:5000/users/employeeRecords/count", {
            method: "GET"
        })
        .then((res) =>{
            console.log(res);
            return res.json();
        }).then(data => {
            console.log("DEBUGGING")
            console.log(data);
            console.log(Math.ceil(data/numRecordForPage))
            handleUserCount(data);
            handlePageCount(Math.ceil(data/numRecordForPage))
            //We want to refressh tthe Component
            forceUpdate()
            alert(userCount);
            alert(pageCount);
        })

        fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
            })
            .then((res) => {
            console.log(res);
            console.log(res.status);
            //console.log(res.json());
            if (res.status == 200) {
                alert("Perfect! ");
            } else if (res.status == 400) {
                //res.json();
                alert("Invalid CSV file uploaded! ");
                // console.log(res.json().then());
                // console.log((res.json()))
                // res.json().then((data) => {
                //     //saveTestDataHandler(data["error"]);
                // })
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
            
            <div className = "dd-wrapper" style={{display: "flex", marginRight: "20%"}}>
                <label className = "field-wrapper">Sort By:</label>
                <div className = "filter-wrapper">
                <Select options = {actions} value = {selectedValue} onChange = {handleChange} isLoading={isLoading}></Select>
                </div>
                <div>
                <Select options = {sortActions} value = {selectedSortValue}  onChange = {handleSortChange} isLoading={isLoading}></Select>
                </div>
                <button style = {{padding : "7px" , borderRadius: "4px", border: "1px solid lightgrey" , fontSize : "1rem", marginLeft: "15px"}}onClick={submitHandler}>Search</button>
            </div>
  
            <ul className = "vertical-wapper">
                <li>
                <Card className = "header">
                    <div className = "column-wrapper">ID</div>
                    <div className = "column-wrapper">LOGIN</div>
                    <div className = "column-wrapper">NAME</div>
                    <div className = "column-wrapper">SALARY</div>
                    <div className = "column-wrapper">Action Icon</div>
                </Card>
                </li>
                {
                    users.map(user => (
                        <EmployeeItem key = {user.id} id = {user.id} login = {user.login} name = {user.name} salary = {user.salary}></EmployeeItem>
                    ))
                }
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
                    activeClassName={"active"}/>
                </li>
                <br/>
                <br/>
            </ul>

       

        </div>
    )
}

export default EmployeeList