import './App.css';
import UploadUser from "./components/UploadUser";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from './components/EmployeeList';
import NavBar from "./components/NavBar";

// function App(){
//   return(
//     <Router>
//       {/* <SideNav/> */}
//       <NavBar/>
//       <Routes>
//         <Route path="/" element={<EmployeeList class = "main-page"/>} />
//         <Route path="/UploadUser" element={<UploadUser class = "main-page" />} />
//         {/* <Route path = "/" exact component={<EmployeeList></EmployeeList>}></Route>
//         <Route path = "/UploadUser" exact component={<UploadUser></UploadUser>}></Route> */}
//       </Routes>
//     </Router>
//   )
// }


function App(){
  return(
    <Router>
      {/* <SideNav/> */}
      <NavBar/>
      <Routes>
        <Route path = "/" exact element = {<EmployeeList></EmployeeList>}></Route>
        <Route path = "/UploadUser" element = {<UploadUser></UploadUser>}></Route>
        {/* <Route path = "/" exact component={<EmployeeList></EmployeeList>}></Route>
        <Route path = "/UploadUser" exact component={<UploadUser></UploadUser>}></Route> */}
      </Routes>
    </Router>
  )
}


export default App;
