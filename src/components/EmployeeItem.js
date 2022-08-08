import Card from '../UI/Card';
import './EmployeeItem.css';
function EmployeeItem(props){
   return(
    <li>
    <Card className = "employee-item">
      <div className = "column-wrapper">{props.id}</div>
      <div className = "column-wrapper">{props.login}</div>
      <div className = "column-wrapper">{props.name}</div>
      <div className = "column-wrapper">{props.salary}</div>
      <div className = "column-wrapper">Action Icon</div>
    </Card>
    </li>
   )

}

export default EmployeeItem;