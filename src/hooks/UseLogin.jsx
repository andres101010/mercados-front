import {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider';
const UseLogin = () => {
    const {user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);
  return { 
    setEmail,
    setPassword,
    email,
    password,
    loadingLogin,
    setLoadingLogin,
    user,
    setUser

  }
}

export default UseLogin