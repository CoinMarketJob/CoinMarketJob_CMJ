"use client"
import React, { useState, useEffect } from "react";
import './DefaultContainer.css'
import AuthContainer from "./AuthContainer";
import Live from "../live/Live";
import { useLiveVisibility } from "@/hooks/useLiveVisibility";
import { useSearchParams } from "next/navigation";

interface ContainerProps {
    children: React.ReactNode
}

const DefaultContainer: React.FC<ContainerProps> = ({ children }) => {
    const [totalWidth, setTotalWidth] = useState<number>(1920);
    const { isLiveVisible } = useLiveVisibility();
    const searchParams = useSearchParams();
    const [expandedLiveId, setExpandedLiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setTotalWidth(1920);
        window.addEventListener('resize', handleResize);

        // URL'den lives parametresini kontrol et
        const livesParam = searchParams?.get('lives');
        if (livesParam) {
            const liveId = parseInt(livesParam, 10);
            console.log(liveId);
            if (!isNaN(liveId)) {
                setExpandedLiveId(liveId);
            }
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [searchParams]);

    const profileWidth = totalWidth * (1 / 4.5);
    const liveWidth = isLiveVisible ? totalWidth * (1 / 4.5) : 0;
    const childWidth = totalWidth - profileWidth - liveWidth;
    
    return (
        <div className="container-div" style={{ width: totalWidth, display: 'flex' }}>
            <div className="panel-profile" style={{ width: profileWidth }}>
                <AuthContainer />
            </div>
            
            <div className="child-panel" style={{ 
                width: childWidth, 
                marginRight: isLiveVisible ? '8px' : '20px'
            }}>
                {children}
            </div>
            
            {isLiveVisible && (
                <div className="panel-live" style={{ width: liveWidth }}>
                    <Live initialExpandedId={expandedLiveId} />
                </div>
            )}
        </div>
    )
}

export default DefaultContainer;