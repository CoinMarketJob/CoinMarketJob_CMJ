"use client";
import Profile from '../auth/Profile';
import LoginClient from '../auth/LoginClient';
import { User } from '@prisma/client';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CompanyProfile from '../auth/CompanyProfile';

// Define the type for user, including null
type UserType = User | null;

// Function to convert strings to Date
const convertUserDates = (user: any): User => ({
  ...user,
  createdAt: new Date(user.createdAt),
  updatedAt: user.updatedAt ? new Date(user.updatedAt) : null,
  emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
});

const AuthContainer = () => {
  const [currentUser, setCurrentUser] = useState<UserType>(null); // Initialize with null

  useEffect(() => {
    // Async function to fetch user
    async function getUser() {
      try {
        const user = await getCurrentUser();
        if (user) {
          const formattedUser = convertUserDates(user);
          setCurrentUser(formattedUser); // Set formatted user
        } else {
          setCurrentUser(null); // Handle case where user is null
        }
        console.log(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

    getUser(); // Fetch user data on component mount
  }, []); // Empty dependency array to run only once

  return (
    <div style={{display: "flex", width: "100%", height: "100%"}}>
      {currentUser ? <CompanyProfile /> : <LoginClient />}
    </div>
  );
}

export default AuthContainer;
