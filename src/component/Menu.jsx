import {useState, useContext} from 'react'
import avatar from '../assets/user.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Menu = () => {

    const { user } = useContext(UserContext);
    // const [messages] = useState([
    //     { id: 1, name: 'Dante Medina', time: '3 mins ago', message: 'Film festivals used to be do-or-die moments for movie makers. They were where...', img: avatar },
    //     { id: 2, name: 'Dante Medina', time: '3 mins ago', message: 'Film festivals used to be do-or-die moments for movie makers. They were where...', img: avatar },
    //     { id: 3, name: 'Dante Medina', time: '3 mins ago', message: 'Film festivals used to be do-or-die moments for movie makers. They were where...', img: avatar },
    //     { id: 4, name: 'Dante Medina', time: '3 mins ago', message: 'Film festivals used to be do-or-die moments for movie makers. They were where...', img: avatar },
    //     { id: 5, name: 'Dante Medina', time: '3 mins ago', message: 'Film festivals used to be do-or-die moments for movie makers. They were where...', img: avatar },
    //   ]);
      const [isOpen, setIsOpen] = useState(false);

      // Función para alternar la visibilidad del dropdown
      const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="top_nav">
    <div className="nav_menu">
      <div className="nav toggle">
        <button id="menu_toggle" style={{border:'none', margin:'10px'}}>
          <i className="fa fa-bars" style={{font:'x-large'}}></i>
        </button>
      </div>
      <nav className="nav navbar-nav">
        <ul className="navbar-right">
          {/* User Profile */}
          <li className="nav-item dropdown open" style={{ paddingLeft: '15px' }}>
            <button className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleDropdown} style={{border:'none'}} >
              <img src={user.avatar ? user.avatarUrl : avatar} alt="Profile" /> {user ? user.name : ""}
            </button>
            {/* <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/perfil">Perfil</Link>
              <Link className="dropdown-item" href="/herramientas">
                <span>Herramientas</span>
              </Link>
              <Link className="dropdown-item" to="/">
                <i className="fa fa-sign-out pull-right"></i> Salir
              </Link>
            </div> */}
            <div className={`dropdown-menu dropdown-usermenu pull-right ${isOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/perfil">Perfil</Link>
                {/* <Link className="dropdown-item" to="/herramientas">
                    <span>Herramientas</span>
                </Link> */}
                <Link className="dropdown-item" to="/">
                    <i className="fa fa-sign-out pull-right"></i> Salir
                </Link>
                </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  )
}

export default Menu