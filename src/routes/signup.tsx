import { useNavigate } from 'react-router-dom'
import SignUp from '../components/Signup'
import { useUserContext } from '../context/user-auth'

export default function SignupPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  if(user) navigate('/')
  if(!user)return (
    <SignUp />
  )
  
}
