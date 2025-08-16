import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthed, authChecked, children }) {
  if (!authChecked) return null;          
  if (!isAuthed) return <Navigate to="/signin" replace />;
  return children;
}

export default ProtectedRoute;