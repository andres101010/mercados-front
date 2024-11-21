import {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider';
const UseLogin = () => {
    const {user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  return { 
    setEmail,
    setPassword,
    email,
    password,
    loading,
    setLoading,
    user,
    setUser

  }
}

export default UseLogin