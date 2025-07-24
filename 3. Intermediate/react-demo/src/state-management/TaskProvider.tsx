import React, { ReactNode, useReducer } from "react";
import tasksReducer from "./reducers/tasksReducer";
import TasksContext from "./contexts/tasksContext";

interface Props {
  children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <>
      <TasksContext.Provider value={{ tasks: tasks, dispatch: dispatch }}>
        {children}
      </TasksContext.Provider>
    </>
  );
};

export default TaskProvider;
