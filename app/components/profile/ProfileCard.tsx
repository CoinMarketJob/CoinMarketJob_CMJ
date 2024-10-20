import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { useProfileData } from "@/hooks/useProfileData";

export default function ProfileCard() {
  const { profileData } = useProfileData();

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tailwind" style={{ width: "100%" }}>
      <Card>
        <CardHeader>
          <CardTitle>{profileData.nameSurname}</CardTitle>
          <CardDescription>{profileData.headline}</CardDescription>
          <div className="flex w-full">
            <CardDescription>Messages</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              2
            </CardDescription>
          </div>

          <div className="flex w-full">
            <CardDescription>Profile Viewers</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              10
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent>
          <CardTitle>Job Listing</CardTitle>
          <div className="flex w-full">
            <CardDescription>Notifications</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              42
            </CardDescription>
          </div>

          <div className="flex w-full">
            <CardDescription>Recent Applications</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              6
            </CardDescription>
          </div>

          <div className="flex w-full">
            <CardDescription>Active Job Listing</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              1
            </CardDescription>
          </div>
          <div className="flex w-full">
            <CardDescription>Total Job Listing</CardDescription>
            <CardDescription className="flex flex-grow justify-end">
              12
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
