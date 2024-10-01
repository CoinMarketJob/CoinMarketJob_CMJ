"use client";

import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Home from "./components/MobilePage/Home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const [mainDivHeight, setMainDivHeight] = useState(950);
  const mainDivRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateMainDivHeight = useCallback(() => {
    if (typeof window !== 'undefined' && mainDivRef.current) {
      setMainDivHeight(mainDivRef.current.clientHeight);
    }
  }, []);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      updateMainDivHeight();
      if (typeof window !== 'undefined') {
        window.addEventListener("resize", updateMainDivHeight);
        window.addEventListener("load", updateMainDivHeight);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", updateMainDivHeight);
        window.removeEventListener("load", updateMainDivHeight);
      }
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
    if (typeof window !== 'undefined') {
      const content = document.querySelector(
        ".layout-container-div"
      ) as HTMLElement;
      if (content) {
        const scaleX = window.innerWidth / 1920;
        const scaleY = window.innerHeight / 1080;
        const scale = Math.min(scaleX, scaleY);
        content.style.transform = `scale(${scale})`;
        content.style.width = `${window.innerWidth / scale}px`;
        content.style.height = `${window.innerHeight / scale}px`;
      }
    }
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          scaleContent();
          setTimeout(() => setIsLoading(false), 1000);
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      // Initial scaling with a slight delay
      setTimeout(handleResize, 1000);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
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
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner-layout">
              <div className="spinner"></div>
            </div>
          </div>
        )}
        {isMobile ? (
          <Home />
        ) : (
          <Suspense>
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
                              <main
                                className="layout-main-div"
                                ref={mainDivRef}
                              >
                                <DefaultContainer mainDivHeight={mainDivHeight}>
                                  {children}
                                </DefaultContainer>
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
          </Suspense>
        )}
      </body>
    </html>
  );
}
