import useAuth from "./hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
