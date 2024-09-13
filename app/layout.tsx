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
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    function handleResize() {
      const wrapper = document.getElementById("scale-wrapper");
      if (wrapper) {
        const scaleWidth = Math.min(window.innerWidth / 1920, 1);
        wrapper.style.transform = `scaleX(${scaleWidth})`;

        if (window.innerWidth <= 1100) {
          document.body.style.width = "1920px";
        } else {
          document.body.style.width = "100vw";
        }
        document.body.style.height = "100vh";
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
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
        <SessionProvider>
          <LayoutProvider>
            <ProfileProvider>
              <JobsProvider>
                <AuthWrapper>
                  <JobApplicationsProvider>
                    <ProfileDataProvider>
                      <LiveVisibilityProvider>
                        <div id="scale-wrapper">
                          <div className="layout-container-div">
                            <Searchbar />
                            <main className="layout-main-div">
                              <DefaultContainer>{children}</DefaultContainer>
                            </main>
                            <Footer />
                          </div>
                        </div>
                      </LiveVisibilityProvider>
                    </ProfileDataProvider>
                  </JobApplicationsProvider>
                </AuthWrapper>
              </JobsProvider>
            </ProfileProvider>
          </LayoutProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
