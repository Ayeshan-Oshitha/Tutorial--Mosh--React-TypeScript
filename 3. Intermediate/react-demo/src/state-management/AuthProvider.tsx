import React, { ReactNode, useReducer } from "react";
import loginReducer from "./reducers/loginReducer";
import AuthContext from "./contexts/authContext";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(loginReducer, "");
  return (
    <div>
      <AuthContext.Provider value={{ user: user, dispatch: dispatch }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
