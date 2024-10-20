"use client";
import LoginClient from "../auth/LoginClient";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useEffect, useState } from "react";
import styles from "./AuthContainer.module.css";
import { useProfile } from "@/hooks/useCompanyProfile";
import { useSession } from "next-auth/react";
import ProfileCard from "../profile/ProfileCard";
import AccordionCard from "../profile/AccordionCard";

const AuthContainer = () => {
  const { profileType } = useProfile();
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {session ? (
        <div className={styles.sessionContent}>
          <ProfileCard />
          <AccordionCard
            name="John Doe"
            publicationTitle="Sample Publication"
            publisherName="Sample Publisher"
            description="This is a sample description for the AccordionCard component."
          />
        </div>
      ) : (
        <div className={styles.loginWrapper}>
          <LoginClient />
        </div>
      )}
    </div>
  );
};

export default AuthContainer;
