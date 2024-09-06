import { useProfile } from "@/hooks/useCompanyProfile";
import Profile from "../auth/Profile";
import CompanyProfile from "../auth/CompanyProfile";
import { useEffect, useState } from "react";

const ProfileLayout = () => {
  const { profileType } = useProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // veya başka bir yükleme göstergesi
  }

  return (
    <div>
      {profileType === 0 ? <Profile /> : <CompanyProfile />}
    </div>
  );
};

export default ProfileLayout;