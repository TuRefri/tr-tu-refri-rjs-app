import { useEffect, useState } from "react";
import UserProfile from "../components/userProfile";
import UserNotAuthenticated from "../components/userProfile/UserNotAuthenticated";
import { getCurrentUser } from "aws-amplify/auth";

export default function UserProfilePage() {
  const [ authenticated, setAuthenticated] = useState(false)
  useEffect(() =>{
    getCurrentUser()
    .then((data)=>{console.log(data); setAuthenticated(true)})
    .catch((error) => {console.log(error);setAuthenticated(false)})
  })

  if (!authenticated) return <UserNotAuthenticated />
  return <UserProfile />;
}
