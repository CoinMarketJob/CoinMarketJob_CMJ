"use client"
import React, { useState, useEffect, useCallback } from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";
import './DefaultContainer.css'
import AuthContainer from "./AuthContainer";
import Live from "../live/Live";

interface ContainerProps {
    children: React.ReactNode
}

const DefaultContainer: React.FC<ContainerProps> = ({ children }) => {
    const [totalWidth, setTotalWidth] = useState<number>(window.innerWidth);
    const [profileRatio, setProfileRatio] = useState<number>(() => {
        const savedRatio = localStorage.getItem('profileRatio');
        return savedRatio ? parseFloat(savedRatio) : 0.25; // Default to 25% of total width
    });
    const [liveRatio, setLiveRatio] = useState<number>(() => {
        const savedRatio = localStorage.getItem('liveRatio');
        return savedRatio ? parseFloat(savedRatio) : 0.25; // Default to 25% of total width
    });

    useEffect(() => {

        localStorage.setItem('profileRatio', profileRatio.toString());
    }, [profileRatio]);

    useEffect(() => {
        localStorage.setItem('liveRatio', liveRatio.toString());
    }, [liveRatio]);

    const handleResize = useCallback(() => {
        setTotalWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const handleProfileResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
        const newRatio = data.size.width / totalWidth;
        setProfileRatio(newRatio);
    };
    
    const handleLiveResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
        const newRatio = data.size.width / totalWidth;
        setLiveRatio(newRatio);
    };

    const isSmallScreen = totalWidth <= 1024;

    const calculateWidth = (ratio: number) => {
        if (isSmallScreen) {
            return totalWidth * (ratio / 1);
        }
        return totalWidth * ratio;
    };

    const profileWidth = calculateWidth(profileRatio);
    const liveWidth = calculateWidth(liveRatio);
    const childWidth = totalWidth - profileWidth - liveWidth;

    return (
        <div className="container-div" style={{ width: totalWidth }}>
            <Resizable
                width={profileWidth}
                height={200}
                onResize={handleProfileResize}
                axis="x"
                handleSize={[16, 16]}
                resizeHandles={["e"]}
            >
                <div className="resizable-panel-profile" style={{ width: profileWidth }}>
                    <AuthContainer />
                </div>
            </Resizable>
            
            <div className="child-panel" style={{ width: childWidth }}>{children}</div>
            
            <Resizable
                width={liveWidth}
                height={200}
                onResize={handleLiveResize}
                axis="x"
                handleSize={[16, 16]}
                resizeHandles={["w"]}
            >
                <div className="resizable-panel-live" style={{ width: liveWidth }}>
                    <Live />
                </div>
            </Resizable>
        </div>
    )
}

export default DefaultContainer;