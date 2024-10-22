'use client'
import React, { useState } from 'react'
import Button from '../components/general/Button'
import EditProfile from '../components/profile/EditProfile';

const Page = () => {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const handleCloseEditProfile = () => {
    setEditProfile(false);
  };

  return (
    <div className="tailwind" style={{ width: "100%" }}>
      <Button text="Edit Profile" onClick={() => setEditProfile(true)} />
      {editProfile && <EditProfile onClose={handleCloseEditProfile} />}
    </div>
  )
}

export default Page
