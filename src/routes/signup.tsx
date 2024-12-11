import { useNavigate } from 'react-router-dom'
import useUserAuth from '../hooks/useUserAuth'
import SignUp from '../components/Signup'

export default function SignupPage() {
  const navigate = useNavigate()
  const { authenticated, loading } = useUserAuth()
  if(loading) return <h1>Comprobando información</h1>
  if(!loading && authenticated) navigate('/')
  if(!loading && !authenticated)return (
    <SignUp />
  )
  
}
