'use client';

import React, { useState, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handlePasswordSubmit = (password: string) => {
    if (password === 'EthCC') { // Change 'yourpassword' to the actual password
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <PasswordModal onSubmit={handlePasswordSubmit} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
