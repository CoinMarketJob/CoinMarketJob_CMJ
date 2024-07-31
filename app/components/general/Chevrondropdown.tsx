"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Chevrondropdown.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

interface CDropdownProps {
    name: string;
    items: string[];
    selectedItems: string[];
    onSelect: (item: string) => void;
    onDeselect: (item: string) => void;
}

const CDropdown: React.FC<CDropdownProps> = ({ name, items, selectedItems, onSelect, onDeselect }) => {
    const [isCDropdown, setIsCDropdown] = useState(false);

    const ChangeFormDropdown = () => {
        setIsCDropdown(!isCDropdown);
    };

    const handleItemClick = (item: string) => {
        if (selectedItems.includes(item)) {
            onDeselect(item);
        } else {
            onSelect(item);
        }
    };

    return (
        <div style={{ padding: 5 }}>
            {name}
            <FontAwesomeIcon
                onClick={ChangeFormDropdown}
                icon={faChevronDown}
                className="nav-link-icon nav-link-arrow-icon drop-down-arrow"
                style={isCDropdown ? { transform: "rotate(0deg)" } : { transform: "rotate(270deg)" }}
            />
            <AnimatePresence>
                {isCDropdown && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div style={{ padding: 15 }}>
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                    className={`dropdown-item ${selectedItems.includes(item) ? 'selected' : ''}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CDropdown;
