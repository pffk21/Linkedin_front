import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "./AppContext";


export default function RequireAuth({ children }) {
  const { user } = useContext(AppContext);
  const location = useLocation();

  if (!user) {
    
    return <Navigate to="/entrance" state={{ from: location }} replace />;
  }

  return children;
}