"use client";
import React, { useState, useEffect, useRef } from "react";
import "./DefaultContainer.css";
import AuthContainer from "./AuthContainer";
import Live from "../live/Live";
import { useLiveVisibility } from "@/hooks/useLiveVisibility";
import { useSearchParams } from "next/navigation";

interface ContainerProps {
  children: React.ReactNode;
  mainDivHeight: number;
}

const DefaultContainer: React.FC<ContainerProps> = ({
  children,
  mainDivHeight,
}) => {
  const [totalWidth, setTotalWidth] = useState<number>(1920);
  const { isLiveVisible } = useLiveVisibility();
  const searchParams = useSearchParams();
  const [expandedLiveId, setExpandedLiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setTotalWidth(1920);
      updateContainerHeight();
    };
    window.addEventListener("resize", handleResize);
    updateContainerHeight();

    // URL'den lives parametresini kontrol et
    const livesParam = searchParams?.get("lives");
    if (livesParam) {
      const liveId = parseInt(livesParam, 10);
      console.log(liveId);
      if (!isNaN(liveId)) {
        setExpandedLiveId(liveId);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [searchParams]);

  const profileWidth = totalWidth * (1 / 4.5);
  const liveWidth = totalWidth * (1 / 4.5);
  const childWidth = isLiveVisible ? totalWidth - profileWidth - liveWidth : totalWidth - profileWidth;

  const updateContainerHeight = () => {
    if (containerRef.current) {
      const scale = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
      );
      const headerHeight = 130; // Header'ın yüksekliği
      const availableHeight = window.innerHeight / scale - headerHeight;
      containerRef.current.style.height = `${availableHeight}px`;
    }
  };

  return (
    <div
      className="container-div"
      style={{ width: totalWidth, display: "flex", maxHeight: mainDivHeight }}
    >
      <div className="panel-profile" style={{ width: profileWidth }}>
        <AuthContainer />
      </div>

      <div
        className="child-panel"
        style={{
          width: childWidth,
          marginRight: isLiveVisible ? "8px" : "20px",
        }}
      >
        {children}
      </div>

      <div 
        className={`panel-live ${isLiveVisible ? '' : 'hidden'}`} 
        style={{ 
          width: liveWidth,
          padding: isLiveVisible ? '20px' : 0,
          margin: isLiveVisible ? '2px' : 0,
          borderWidth: isLiveVisible ? '1px' : 0,
        }}
      >
        <Live initialExpandedId={expandedLiveId} />
      </div>
    </div>
  );
};

export default DefaultContainer;
