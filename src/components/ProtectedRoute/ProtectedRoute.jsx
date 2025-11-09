import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to="/" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
