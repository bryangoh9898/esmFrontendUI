import React from 'react';
import './SideNav.css';
import {  Link } from "react-router-dom";

const SideNav = (props) =>{

    return(
        // <div className = "sidenav">
        //     <p>Employee <a href= "www.google.com"></a></p>
        //     <a href = "#">Employee Dashboard</a>
        //     <a href = "#">Upload User</a>
        // </div>
        <div className = "sidenav">
            <Link className = "link" to="/">Employee List</Link>
            <Link className = "link" to="/UploadUser">Upload User</Link>
        </div>
    )

}

export default SideNav;
