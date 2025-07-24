import { Dispatch } from "react";
import { AuthAction } from "./authReducer";
import React from "react";

// What type of data the the context carry
interface AuthContextType {
  user: string;
  dispatch: Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
