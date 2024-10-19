"use client";
import LoginClient from "../auth/LoginClient";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useEffect, useState } from "react";
import styles from "./AuthContainer.module.css";
import { useProfile } from "@/hooks/useCompanyProfile";
import { useSession } from "next-auth/react";
import ProfileCard from "../profile/ProfileCard";

const AuthContainer = () => {
  const { profileType } = useProfile();
  const { data: session } = useSession();

  return (
    <div
      className={styles.container}
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {session ? (
        <ProfileCard />
      ) : (
        <LoginClient />
      )}
    </div>
  );
};

export default AuthContainer;