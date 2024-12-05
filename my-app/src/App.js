import React, { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import TaskForm from "./components/TaskForm"; 
import TaskList from "./components/TaskList"; 
import Filters from "./components/Filters"; 
import "./App.css";

// This simulates a set of predefined tasks to be displayed on the dashboard
const initialTasks = [
  { id: 1, title: "Task 1", description: "Description 1", status: "Pending" },
  { id: 2, title: "Task 2", description: "Description 2", status: "In Progress" },
  { id: 3, title: "Task 3", description: "Description 3", status: "Completed" },
];

// Reducer function to manage tasks state

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload }; // Sets the tasks (usually fetched from an API)
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] }; // Adds a new task
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      }; // Edits an existing task by matching its id and updating the properties
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) }; // Deletes a task by id
    default:
      return state; // If no valid action type is found, it returns the current state unchanged
  }
};

function App() {
  // Using useReducer to manage the state of tasks
  // The state consists of an array of tasks, and `dispatch` is used to trigger actions that change the state
  const [state, dispatch] = useReducer(taskReducer, { tasks: initialTasks });
  
  // Local state to manage the current filter selection 
  const [filter, setFilter] = useState("All");

  // useEffect to simulate an API call to fetch tasks when the component mounts
  useEffect(() => {
    // Simulate an API fetch with mock data
    setTimeout(() => {
      dispatch({ type: "SET_TASKS", payload: initialTasks }); // Dispatch action to set tasks
    }, 1000); // Simulate delay of 1 second
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

  // useMemo to memoize the filtered tasks list to avoid unnecessary re-renders
  // The filter is applied based on the selected filter ('All', 'Pending', etc.)
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (filter === "All") return true; // If filter is 'All', show all tasks
      return task.status === filter; // Show tasks matching the selected filter status
    });
  }, [state.tasks, filter]); // Re-run the effect if tasks or filter state changes

  // useMemo to memoize the sorted tasks list based on the task title
  // Sorting is done alphabetically by task title
  const sortedTasks = useMemo(() => {
    return filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredTasks]); // Re-run the effect if the filtered tasks change

  // useCallback to memoize the `addTask` function to avoid unnecessary re-creation of the function on each render
  // The function dispatches an 'ADD_TASK' action with the new task to add to the state
  const addTask = useCallback((task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, [dispatch]); // The `dispatch` function does not change, so we use it as a dependency

  // useCallback to memoize the `editTask` function to prevent re-creation on each render
  // The function dispatches an 'EDIT_TASK' action to modify the task details based on its id
  const editTask = useCallback((id, updates) => {
    dispatch({ type: "EDIT_TASK", payload: { id, updates } });
  }, [dispatch]);

  // useCallback to memoize the `deleteTask` function to prevent re-creation on each render
  // The function dispatches a 'DELETE_TASK' action to remove the task by its id
  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1>Task Dashboard</h1>
      {/* Filters component to allow the user to choose which tasks to view */}
      <Filters filter={filter} setFilter={setFilter} />
      
      {/* TaskForm component to add new tasks. `addTask` is passed as a prop */}
      <TaskForm addTask={addTask} />
      
      {/* TaskList component to display the list of tasks. Sorted tasks are passed as a prop */}
      <TaskList tasks={sortedTasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
