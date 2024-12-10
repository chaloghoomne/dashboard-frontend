import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({children}) => {
  const authToken = localStorage.getItem("token");
  const auth = !!authToken;

  return auth ? children : <Navigate to="/login" />;
};
export default PrivateRoutes;
