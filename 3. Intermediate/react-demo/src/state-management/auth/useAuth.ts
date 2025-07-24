import { useContext } from "react";
import AuthContext from "../auth/authContext";

// Allow us to easily use the contet in components
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
