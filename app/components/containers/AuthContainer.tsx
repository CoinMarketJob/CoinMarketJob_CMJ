"use client"
import Profile from '../auth/Profile';
import LoginClient from '../auth/LoginClient';
import { User } from '@prisma/client';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CompanyProfile from '../auth/CompanyProfile';


const AuthContainer = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    async function getUser() {      
      const user =  await getCurrentUser();
      setCurrentUser(user);
      console.log(currentUser);      
    }
    getUser();

  },[])

  return (
    <div style={{display: "flex", width: "100%", height: "100%"}}>
        {currentUser ? (<Profile />) : (<LoginClient />)}
    </div>
  )
}

export default AuthContainer