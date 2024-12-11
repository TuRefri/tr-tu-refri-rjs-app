import { useNavigate } from 'react-router-dom'
import Login from '../components/authentication/Login'
import useUserAuth from '../hooks/useUserAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { authenticated, loading } = useUserAuth()
  if(loading) return <h1>Comprobando información</h1>
  if(!loading && authenticated) navigate('/')
  if(!loading && !authenticated)return (
    <Login />
  )
  
}
