import EmployeeListItem from "../app-employee-list-item/app-employee-list-item";

import "./app-employee-list.scss";

const EmployeeList = ({ data, onDelete, onToggleProp }) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item;
    return (
        <EmployeeListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
    )
})

  return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeeList;
