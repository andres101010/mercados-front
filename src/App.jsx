import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'nprogress/nprogress.css';
import 'animate.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/custom.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Mercados from './pages/Mercados';
import Puestos from './pages/Puestos';
import Arrendatarios from './pages/Arrendatarios';
import Index from './pages/Index';
import UserProvider from './context/UserProvider';
import Usuarios from './pages/Usuarios';
import ProtectedRoute from './component/ProtectedRoute';
import Perfil from './pages/Perfil';
import PdfRenderer from './component/PdfRenderer';
// import * as jwtDecode from 'jwt-decode';

function App() {



  // useEffect(() => {
  //   const token = document.cookie.replace('jwt=', '');
  //   console.log('Token en cookies:', token);  // Verifica si el token se extrae correctamente

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log(decoded);  // Ver el payload decodificado
  //       console.log('Fecha de expiración:', new Date(decoded.exp * 1000));  // Fecha de expiración en formato legible
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //     }
  //   }
  // }, []); 
  return (
    <>
  
<UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública para el inicio de sesión */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          >
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/mercados" element={<Mercados />} />
            <Route path="/puestos/:place" element={<Puestos />} />
            <Route path="/arrendatarios/:place" element={<Arrendatarios />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/:place/pdf" element={<PdfRenderer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  
    </>
  )
}

export default App
