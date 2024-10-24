'use client'
import React, { useState } from 'react'
import Button from '../components/general/Button'
import EditProfile from '../components/profile/EditProfile';
import ProfilePage from '../components/profile/ProfilePage';
import { Dice1 } from 'lucide-react';

const Page = () => {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const handleCloseEditProfile = () => {
    setEditProfile(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <ProfilePage />
    </div>
  )
}

export default Page
