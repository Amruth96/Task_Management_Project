import React, { useState } from "react";  
// Functional component `TaskForm` accepts `addTask` as a prop, which is a function to add new tasks
const TaskForm = ({ addTask }) => {
  
  // Declaring state variables to manage the form inputs for task title and description
  const [title, setTitle] = useState("");  
  const [description, setDescription] = useState("");  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior 

    // Check if the title or description is empty, and if so, return early
    if (!title || !description) return;

    
    const newTask = {
      id: Date.now(),  // Use current timestamp as a unique task ID
      title,           
      status: "Pending",  
    };

    // Call the `addTask` function passed as a prop to add the new task to the task list
    addTask(newTask);

    setTitle("");  // Reset title input field
    setDescription("");  // Reset description input field
  };

  return (
    
    <form onSubmit={handleSubmit}>  
      
      <input
        type="text"  
        placeholder="Task Title"  
        value={title}  
        onChange={(e) => setTitle(e.target.value)}  // Update title state when the input changes
      />
      
      {/* Description input field */}
      <textarea
        placeholder="Task Description"  
        value={description}  
        onChange={(e) => setDescription(e.target.value)}  // Update description state when the textarea changes
      />
      
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm; 
