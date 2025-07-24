import { useContext } from "react";
import AuthContext from "../auth/authContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
