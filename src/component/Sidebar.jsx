/* eslint-disable react/prop-types */
import avatar from '../assets/user.png'
import { Link } from 'react-router-dom';
import UseSideBar from '../hooks/UseSideBar';
import { useContext } from 'react';
import {UserContext}  from '../context/UserProvider';
import './component.css'
const Sidebar = (props) => {
  const { activeIndex,
          handleClick,
          isSidebarOpen,
          // setIsSidebarOpen,
          toggleSidebar       
        } = UseSideBar();

  const { user, mercados } = useContext(UserContext)


  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

 

  return (
    <div className="main_container">

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="fa fa-bars"></i>
      </button>

      {/* <div className="col-md-3 left_col"> */}
      <div className={`col-md-3 left_col ${isSidebarOpen ? "open" : ""}`}>
        <div className="left_col scroll-view">
          <div className="navbar nav_title" style={{ border: 0 }}>
            <a href="index.html" className="site_title">
              <i className="fa fa-cog"></i> <span>SDGM</span>
            </a>
          </div>

          <div className="clearfix"></div>

          {/* Menu Profile Quick Info */}
          <div className="profile clearfix">
            <div className="profile_pic">
              <img src={user.avatarUrl ? user.avatarUrl : avatar} alt="..." className="img-circle profile_img" />
            </div>
            <div className="profile_info">
              <span>{user.level == 1 ? "Administrador" : user.level == 2 ? "Digitador" : ""}</span>
              <h2>{user.name}</h2>
            </div>
            <div className="clearfix"></div>
          </div>

          <br />

          {/* Sidebar Menu */}
          <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
              <h3>General</h3>
              <ul className="nav side-menu">
                <li className={activeIndex === 0 ? "active" : ""} onClick={() => handleClick(0)}>
                  <Link to="/inicio"><i className="fa fa-home"></i> Inicio</Link>
                </li>
                <li className={activeIndex === 1 ? "active" : ""} onClick={() => handleClick(1)}>
                  <Link to="/mercados"><i className="fa fa-shopping-cart"></i> Mercados</Link>
                </li>
                <li className={activeIndex === 2 ? "active" : ""}    >
                  <Link>
                    <i className="fa fa-cubes"></i> Puestos <span className="fa fa-chevron-down"></span>
                  </Link>
                  <ul className="nav child_menu">
                   
                    {
                      mercados && mercados.length == 0 ? 
                      (
                        <div></div>
                      )
                      :
                      (
                        mercados?.data.map((place, index) => {
                          const formattedPlace = place.nombre.replace(/\s+/g, '-'); // Reemplaza espacios con guiones
                          return (
                            <li key={index} onClick={() => handleClick(2)}>
                              <Link to={`/puestos/${formattedPlace}`}>{place.nombre}</Link>
                            </li>
                          );
                        })
                      )
                    }
                  </ul>
                </li>
                <li className={activeIndex === 3 ? "active" : ""}   >
                  <Link >
                    <i className="fa fa-users"></i> Arrendatarios <span className="fa fa-chevron-down"></span>
                  </Link>
                  <ul className="nav child_menu">
                 
                    {
                      mercados && mercados.length == 0 ?
                      
                      (
                        <div></div>
                      )
                      :
                      (
                        mercados?.data.map((place, index) => {
                          const formattedPlace = place.nombre.replace(/\s+/g, '-'); // Reemplaza espacios con guiones
                          return (
                            <li key={index} onClick={() => handleClick(3)}>
                              <Link to={`/arrendatarios/${formattedPlace}`}>{place.nombre}</Link>
                            </li>
                          );
                        })
                      )
                    }
                  </ul>
                </li>
                <li className={activeIndex === 4 ? "active" : ""} onClick={() => handleClick(4)}>
                  <Link to="/usuarios"><i className="fa fa-user"></i> Usuarios</Link>
                </li>
                <li className={activeIndex === 5 ? "active" : ""} onClick={() => handleClick(5)}>
                  <Link to="/informes"><i className="fa fa-file-pdf-o"></i> Informes</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* /Sidebar Menu */}

          {/* Footer Menu Buttons */}
          <div className="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="Herramientas">
              <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Pantalla Completa">
              <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Ver">
              <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Salir" href="login.html">
              <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div>
          {/* /Footer Menu Buttons */}
        </div>
      </div>
      
      <div className="content">{props.children}</div>
    </div>
  );

 
};




export default Sidebar;
