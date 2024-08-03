"use client";
import Profile from '../auth/Profile';
import LoginClient from '../auth/LoginClient';
import { User } from '@prisma/client';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { useEffect, useState } from 'react';
import {useRouter, useSearchParams } from 'next/navigation';
import CompanyProfile from '../auth/CompanyProfile';
import { signIn } from 'next-auth/react';
import Button from '../general/Button';
import Input from '../general/Input';

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

  return (
    <div style={{display: "flex", width: "100%", height: "100%"}}>
      {currentUser ? <CompanyProfile /> : <LoginClient />}
    </div>
  );
}

export default AuthContainer;
