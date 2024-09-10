"use client"
import React, { useState, useEffect } from "react";
import './DefaultContainer.css'
import AuthContainer from "./AuthContainer";
import Live from "../live/Live";
import { useLiveVisibility } from "@/hooks/useLiveVisibility";

interface ContainerProps {
    children: React.ReactNode
}

const DefaultContainer: React.FC<ContainerProps> = ({ children }) => {
    const [totalWidth, setTotalWidth] = useState<number>(window.innerWidth);
    const { isLiveVisible } = useLiveVisibility();

    useEffect(() => {
        const handleResize = () => setTotalWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const profileWidth = totalWidth * (1 / 4.5);
    const liveWidth = isLiveVisible ? totalWidth * (1 / 4.5) : 0;
    const childWidth = totalWidth - profileWidth - liveWidth;

    return (
        <div className="container-div" style={{ width: totalWidth, display: 'flex' }}>
            <div className="panel-profile" style={{ width: profileWidth }}>
                <AuthContainer />
            </div>
            
            <div className="child-panel" style={{ width: childWidth }}>{children}</div>
            
            {isLiveVisible && (
                <div className="panel-live" style={{ width: liveWidth }}>
                    <Live />
                </div>
            )}
        </div>
    )
}

export default DefaultContainer;