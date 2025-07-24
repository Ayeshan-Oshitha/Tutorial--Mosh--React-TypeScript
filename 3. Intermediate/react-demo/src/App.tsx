import { useReducer } from "react";
import "./App.css";
import LoginStatus from "./state-management/LoginStatus";
import tasksReducer from "./state-management/reducers/tasksReducer";
import NavBar from "./state-management/NavBar";
import TasksContext from "./state-management/contexts/tasksContext";
import HomePage from "./state-management/HomePage";
import loginReducer from "./state-management/reducers/loginReducer";
import AuthContext from "./state-management/contexts/authContext";

function App() {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
  const [user, authDispatch] = useReducer(loginReducer, "");

  return (
    <>
      <AuthContext.Provider value={{ user: user, dispatch: authDispatch }}>
        <TasksContext.Provider
          value={{ tasks: tasks, dispatch: tasksDispatch }}
        >
          <NavBar />
          <HomePage />
        </TasksContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
