"use client";

import "./globals.css";
import DefaultContainer from "./components/containers/DefaultContainer";
import Searchbar from "./components/Search/Searchbar";
import { JobsProvider } from "@/hooks/useJobs";
import { CitiesProvider } from "@/hooks/useCity";
import Footer from "./components/Footer/Footer";
import { LayoutProvider } from "@/hooks/useLayout";
import AuthWrapper from "./AuthWrapper";
import { SessionProvider } from "next-auth/react"; // Add this import
import { ProfileProvider } from "@/hooks/useCompanyProfile";
import { JobApplicationsProvider } from "@/hooks/useApplicationJob";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                <CitiesProvider>
                  <AuthWrapper>
                    <JobApplicationsProvider>
                      <div className="layout-container-div">
                        <Searchbar />
                        <main className="layout-main-div">
                          <DefaultContainer>{children}</DefaultContainer>
                        </main>
                        <Footer />
                      </div>
                    </JobApplicationsProvider>
                  </AuthWrapper>
                </CitiesProvider>
              </JobsProvider>
            </ProfileProvider>
          </LayoutProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
