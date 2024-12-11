// ProtectedRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider'; 
import Spinner from './spinner/Spinner';
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
 
  if (loading) {
    return <div><Spinner /></div>; 
  }
   
  if (!user) {
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
