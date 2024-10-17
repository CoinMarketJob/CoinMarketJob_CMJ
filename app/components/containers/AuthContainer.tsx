"use client";
import LoginClient from "../auth/LoginClient";
import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/useCompanyProfile";

const AuthContainer = () => {
  const { profileType } = useProfile();
  const { data: session } = useSession();

  return (
    <div className="flex w-full h-full overflow-y-auto scrollbar-none">
      {session ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="border-4 border-gray-300 rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-red-600">hello</h1>
          </div>
        </div>
      ) : (
        <LoginClient />
      )}
    </div>
  );
};

export default AuthContainer;
