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

export default function ProfileCard() {
  return (
    <div className="tailwind" style={{ width: "100%" }}>
      <Card>
        <CardHeader>
          <CardTitle>Name Surname</CardTitle>
          <CardDescription>Headline Sentence Here</CardDescription>
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
