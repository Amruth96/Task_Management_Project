import React from "react"; 

// Functional component `Filters` accepts `filter` and `setFilter` as props
const Filters = ({ filter, setFilter }) => {
  return (
    <div>
      {/* Dropdown select element to filter tasks based on their status */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>

        <option value="All">All Tasks</option>
        
        <option value="Pending">Pending</option>
        
        <option value="In Progress">In Progress</option>
        
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default Filters; 
