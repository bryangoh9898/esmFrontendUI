import { prependToMemberExpression } from '@babel/types';
import Card from '../UI/Card';
import './EmployeeItem.css';
function EmployeeItem(props){
   return(
    <li>
    <Card className = "expense-item">
      <div className = "column-wrapper">{props.id}</div>
      <div className = "column-wrapper">{props.login}</div>
      <div className = "column-wrapper">{props.name}</div>
      <div className = "column-wrapper">{props.salary}</div>
      <div className = "column-wrapper">Action Icon</div>

      {/* <div className = "expense-item__description">
        <h2>testetss</h2>
        <div className = "expense-item__price">${props.name}</div>
      </div> */}
      {/* <button onClick= {clickHandler}>Change Title</button> */}
    </Card>
    </li>
   )

}

export default EmployeeItem;