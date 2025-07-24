import React, { ReactNode, useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

interface Props {
  children: ReactNode;
}

// Providing the data to context
const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, "");
  return (
    <div>
      <AuthContext.Provider value={{ user: user, dispatch: dispatch }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
