import './App.css';
import UploadUser from "./components/UploadUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from './components/EmployeeList';
import NavBar from "./components/NavBar";


function App(){
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path = "/" exact element = {<EmployeeList></EmployeeList>}></Route>
        <Route path = "/UploadUser" element = {<UploadUser></UploadUser>}></Route>
      </Routes>
    </Router>
  )
}


export default App;
