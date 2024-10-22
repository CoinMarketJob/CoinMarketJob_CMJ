'use client'
import React, { useState } from 'react'
import Button from '../components/general/Button'
import EditProfile from '../components/profile/EditProfile';

const page = () => {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const handleCloseEditProfile = () => {
    setEditProfile(false);
  };

  return (
    <div className="tailwind">
      <Button text="Edit Profile" onClick={() => setEditProfile(true)} />

      {editProfile && <EditProfile onClose={handleCloseEditProfile} />}
    </div>
  )
}

export default page
