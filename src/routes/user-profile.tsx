import { useEffect, useState } from "react";
import UserProfile from "../components/userProfile";
import UserNotAuthenticated from "../components/userProfile/UserNotAuthenticated";
import { getCurrentUser } from "aws-amplify/auth";

export default function UserProfilePage() {
  const [ authenticated, setAuthenticated] = useState(false)
  useEffect(() =>{
    getCurrentUser()
    .then(()=> setAuthenticated(true))
    .catch(() => setAuthenticated(false))
  })

  if (!authenticated) return <UserNotAuthenticated />
  return <UserProfile />;
}
