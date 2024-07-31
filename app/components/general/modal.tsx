"use client";

import { ReactElement } from "react";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

interface ModalBoxProps {
    CloseModal: () => void;
    setPhase? : () => void;
    Name: string;
    Children: ReactElement;
    BGColor?: string;
}

const Modals: React.FC<ModalBoxProps> = ({ Name, CloseModal, Children, setPhase, BGColor }) => {
    return (
        <div style={{backgroundColor: BGColor }} className="modalContent">
            <h2></h2>
            <div className="modal-children">
                {Children}
            </div>
            <ul style={{padding: "0%", display: "flex", flexDirection: "row", marginLeft: "65%"}} >
            <Button backgroundColor="white" textColor="black" text="Cancel" onClick={CloseModal} />
            <Button text="Save" onClick={setPhase} />
            </ul>
        </div>
    );
};

export default Modals;
