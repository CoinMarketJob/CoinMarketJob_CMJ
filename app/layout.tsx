"use client";

import "./globals.css";
import DefaultContainer from "./components/containers/DefaultContainer";
import Searchbar from "./components/Search/Searchbar";
import { JobsProvider } from "@/hooks/useJobs";
import Footer from "./components/Footer/Footer";
import { LayoutProvider } from "@/hooks/useLayout";
import AuthWrapper from "./AuthWrapper";
import { SessionProvider } from "next-auth/react"; // Add this import
import { ProfileProvider } from "@/hooks/useCompanyProfile";
import { JobApplicationsProvider } from "@/hooks/useApplicationJob";
import { ProfileDataProvider } from "@/hooks/useProfileData";
import { LiveVisibilityProvider } from "@/hooks/useLiveVisibility";
import { useEffect, useState } from "react";
import Home from "./components/MobilePage/Home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      const dpi = window.devicePixelRatio || 1;
      const width = window.screen.width * dpi;
      const height = window.screen.height * dpi;
      const diagonalSize = Math.sqrt(width * width + height * height) / dpi / 96; // 96 DPI is a common reference point

      setIsMobile(diagonalSize < 7); // Assuming devices smaller than 7 inches are mobile
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body>
        {isMobile ? (
          <Home />
        ) : (
          <SessionProvider>
            <LayoutProvider>
              <ProfileProvider>
                <JobsProvider>
                  <AuthWrapper>
                    <JobApplicationsProvider>
                      <ProfileDataProvider>
                        <LiveVisibilityProvider>
                          <div className="layout-container-div">
                            <Searchbar />
                            <main className="layout-main-div">
                              <DefaultContainer>{children}</DefaultContainer>
                            </main>
                            <Footer />
                          </div>
                        </LiveVisibilityProvider>
                      </ProfileDataProvider>
                    </JobApplicationsProvider>
                  </AuthWrapper>
                </JobsProvider>
              </ProfileProvider>
            </LayoutProvider>
          </SessionProvider>
        )}
      </body>
    </html>
  );
}
