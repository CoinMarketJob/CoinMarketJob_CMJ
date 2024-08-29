"use client";
import LoginClient from "../auth/LoginClient";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useEffect, useState } from "react";
import CompanyProfile from "../auth/CompanyProfile";
import Profile from "../auth/Profile";
import styles from "./AuthContainer.module.css";
import { useProfile } from "@/hooks/useCompanyProfile";

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
  const { profileType } = useProfile();

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(convertUserDates(user));
      } else {
        setCurrentUser(null);
      }
    }

    getUser();
  }, []);

  return (
    <div
      className={styles.container}
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {currentUser ? (
        profileType == 0 ? (
          <Profile />
        ) : (
          <CompanyProfile />
        )
      ) : (
        <LoginClient />
      )}
    </div>
  );
};

export default AuthContainer;
