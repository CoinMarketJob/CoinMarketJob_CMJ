import { useProfile } from "@/hooks/useCompanyProfile";
import Profile from "../auth/Profile";
import CompanyProfile from "../auth/CompanyProfile";

const ProfileLayout = () => {
  const { profileType } = useProfile();

  return (
    <div>
      {profileType === 0 ? <Profile /> : <CompanyProfile />}
    </div>
  );
};

export default ProfileLayout;