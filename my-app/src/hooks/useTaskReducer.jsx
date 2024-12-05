import { useReducer } from "react"; 

export const taskReducer = (state, action) => {
  switch (action.type) {
    
    case "SET_TASKS":
      // Returning the new state with tasks updated to the payload value
      return { ...state, tasks: action.payload };


    case "ADD_TASK":
      // Returning the new state with the new task added to the existing tasks list
      return { ...state, tasks: [...state.tasks, action.payload] };

    
    case "EDIT_TASK":
      // Returning the new state with the task that matches `taskId` being updated with `updatedTask` data
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, ...action.payload.updatedTask } : task
        ),
      };

    case "DELETE_TASK":
      // Returning the new state with the task removed from the tasks list
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };

    default:
      return state;
  }
};

// Initial state for the task management
// The initial state includes an empty tasks array, which will later hold the tasks data
export const initialState = {
  tasks: [],
};

// This hook initializes the state with the `initialState` and provides the `dispatch` function to dispatch actions
export const useTaskReducer = () => useReducer(taskReducer, initialState);
