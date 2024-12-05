import React from "react";  

// Functional component `TaskList` accepts three props:
// - `tasks`: an array of task objects
// - `editTask`: a function to handle editing a task
// - `deleteTask`: a function to handle deleting a task
const TaskList = ({ tasks, editTask, deleteTask }) => {

  return (
    <div>  
      
      {/* Mapping over the `tasks` array to render each task */}
      {tasks.map((task) => (
        <div key={task.id} className="task-item">  
          
          <h3>{task.title}</h3>  
          <p>{task.description}</p>  
          <p>Status: {task.status}</p>  

          {/* Button to mark the task's status as "In Progress". When clicked, it calls `editTask` to update the task's status */}
          <button onClick={() => editTask(task.id, { status: "In Progress" })}>Start</button>

          {/* Button to mark the task's status as "Completed". When clicked, it calls `editTask` to update the task's status */}
          <button onClick={() => editTask(task.id, { status: "Completed" })}>Complete</button>

          {/* Button to delete the task. When clicked, it calls `deleteTask` with the task's ID to remove the task */}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          
        </div>
      ))}
    </div>
  );
};

export default TaskList;
