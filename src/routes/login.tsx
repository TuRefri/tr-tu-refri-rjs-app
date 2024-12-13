import { useNavigate } from 'react-router-dom'
import Login from '../components/authentication/Login'
import { useUserContext } from '../context/user-auth';

export default function LoginPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  if(user) navigate('/')
  if(!user)return (
    <Login />
  )
  
}
