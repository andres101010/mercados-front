import { useContext } from 'react'
import avatar from '../assets/user.png'
import { UserContext } from '../context/UserProvider'
// import '../styles/custom.css'
const Perfil = () => {
    const { user } = useContext(UserContext)
  return (
    <div className='perfil-content'>
        <div><h1 style={{textAlign:'center'}}>Informacion De Perfil</h1></div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <img src={user.avatar ? user.avatarUrl : avatar} alt="..photo" style={{width:'350px', height:'350px', borderRadius:'50%'}} />
        </div>
        <div>
            <h2 style={{textAlign:'center'}}><span style={{fontSize:'40px'}}>{user.cargo}</span></h2>
        </div>
        <div>
            <h2 style={{textAlign:'center'}}><span style={{fontSize:'40px'}}>Nombre: {user.name}</span></h2>
        </div>
        <div>
            <h2 style={{textAlign:'center'}}><span style={{fontSize:'40px'}}>Telefono: {user.phone}</span></h2>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <h2 style={{textAlign:'center', backgroundColor:user.isActive ? 'green' : 'red', color:'white', width:'300px'}}><span style={{fontSize:'40px'}}>{user.isActive ? 'Activo' : 'Inactivo'}
            </span>
            { user.isActive ?
                <i className="fas fa-check" style={{marginLeft:'20px', fontSize:'35px'}}></i>
                :
                <i className="fas fa-times" style={{marginLeft:'20px', fontSize:'35px'}}></i>

            }
            
            </h2>
        </div>
    </div>
  )
}

export default Perfil