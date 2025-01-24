import { createContext, useState, useEffect } from 'react';
import { getMercados } from '../services/mercados';
import { jwtDecode } from 'jwt-decode';
import { logoutService } from '../services/login';
// Crea el contexto fuera del componente
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mercados, setMercados] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMercados = async () => {
    try {
      const response = await getMercados();
      setMercados(response);
    } catch (error) {
      console.log('Error', error);
    }
  };



 
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   console.log("storedUser", JSON.stringify(storedUser));
  //   const token = storedUser?.token; 
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       const now = Math.floor(Date.now() / 1000); 
  //       if (decodedToken.exp > now) {
  //         setUser(storedUser); 
  //       } else {
  //         localStorage.removeItem('user'); 
  //       }
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //       localStorage.removeItem('user');
  //     }
  //   }
    
  //   handleMercados();
  //   setLoading(false);
  // }, []);


  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.token) {
        try {
          const decodedToken = jwtDecode(storedUser.token);
          const now = Math.floor(Date.now() / 1000); // Fecha actual en segundos
          
          if (decodedToken.exp > now) {
            setUser(storedUser);
          } else {
            console.log("Token expirado, eliminando usuario...");
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          localStorage.removeItem('user');
        }
      }
      await handleMercados();
      setLoading(false);
    };

    initializeUser();
  }, []);

  const logout = async () => {
    await logoutService(); 
    setUser(null); 
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, mercados, setMercados, handleMercados, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
