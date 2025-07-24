import React from "react";
import { Task, TaskAction } from "./tasksReducer";

interface TasksContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TasksContext;
