"use client";

import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
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
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Home from "./components/MobilePage/Home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const [mainDivHeight, setMainDivHeight] = useState(950);
  const mainDivRef = useRef<HTMLDivElement>(null);

  const updateMainDivHeight = useCallback(() => {
    if (mainDivRef.current) {
      setMainDivHeight(mainDivRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    updateMainDivHeight();
    window.addEventListener("resize", updateMainDivHeight);
    window.addEventListener("load", updateMainDivHeight);

    const resizeObserver = new ResizeObserver(updateMainDivHeight);
    if (mainDivRef.current) {
      resizeObserver.observe(mainDivRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateMainDivHeight);
      window.removeEventListener("load", updateMainDivHeight);
      resizeObserver.disconnect();
    };
  }, [updateMainDivHeight]);
  

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

  const scaleContent = useCallback(() => {
    const content = document.querySelector(".layout-container-div") as HTMLElement;
    if (content) {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const scale = Math.min(scaleX, scaleY);
      content.style.transform = `scale(${scale})`;
      content.style.width = `${window.innerWidth / scale}px`;
      content.style.height = `${window.innerHeight / scale}px`;
    }
  }, []);

  useLayoutEffect(() => {
    scaleContent();
  }, [scaleContent]);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(scaleContent);
    };

    window.addEventListener("resize", handleResize);
    
    // Sayfa yüklendikten kısa bir süre sonra tekrar scale'i uygula
    const timeoutId = setTimeout(scaleContent, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [scaleContent]);

  return (
    <html
      lang="en"
      style={{
        width: isMobile ? "100vw" : "1900px",
        minWidth: isMobile ? "100vw" : "1900px",
      }}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body
        style={{
          width: isMobile ? "100vw" : "1900px",
          minWidth: isMobile ? "100vw" : "1900px",
        }}
      >
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
                            <main className="layout-main-div" ref={mainDivRef}>
                              <DefaultContainer mainDivHeight={mainDivHeight}>{children}</DefaultContainer>
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
