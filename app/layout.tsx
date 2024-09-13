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

  function isMobilePhone() {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const dpi = window.devicePixelRatio || 1;
    const width = screen.width * dpi;
    const height = screen.height * dpi;

    const uaCheck =
      /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

    return uaCheck;
  }

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(isMobilePhone());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <html lang="en">
      <head style={{ width: isMobile ? "100vw" : "1900px" }}>
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
