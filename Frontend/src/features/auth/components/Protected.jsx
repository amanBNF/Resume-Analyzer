import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../pages/Loading";
import { Navigate } from "react-router";

const Protected = ({ children }) => {

  const { loading, user } = useAuth();
  // const navigate = useNavigate();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;