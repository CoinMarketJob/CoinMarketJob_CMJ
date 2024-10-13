"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchInput.css';
import React, { useState, useRef, useEffect } from 'react';
import { faMagnifyingGlass, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useJobs } from '@/hooks/useJobs';
import { useRouter } from 'next/navigation';
import JobFilterPopUp from '../jobfilter/Job';
import { Job as PrismaJob, JobType, LocationType, ExperienceLevel } from '@prisma/client';
import Icon from '../general/Icon';

// Update the Job interface to match the Prisma Job type
interface Job extends Omit<PrismaJob, 'date'> {
    date: Date;
}

interface SearchProps {
    tags: Array<string>;
    setTags: (tags: Array<string>) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
}

const SearchInput: React.FC<SearchProps> = ({ tags, setTags, isFilterOpen, setIsFilterOpen }) => {
    const [inputValue, setInputValue] = useState('');
    const [newTagIndex, setNewTagIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const bubleFieldRef = useRef<HTMLDivElement>(null);
    const { jobs, filteredJobs, setFilteredJobs } = useJobs();
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState('Type keyword, company or location');
    const [isFaded, setIsFaded] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' && inputValue.trim()) {
            addNewTag();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            let updatedTags = [...tags];
            if (inputValue.trim()) {
                updatedTags = addNewTag();
            }
            filterJobs(updatedTags);
        }
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            e.preventDefault();
            const newTags = tags.slice(0, -1);
            setTags(newTags);
            updatePlaceholder(newTags);
        }
    };

    const addNewTag = () => {
        const newTag = inputValue.trim();
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setNewTagIndex(tags.length);
        setInputValue('');
        updatePlaceholder(updatedTags);
        return updatedTags;
    };

    const updatePlaceholder = (newTags: string[]) => {
        if (newTags.length === 0) {
            setPlaceholder('Type keyword, company or location');
        } else {
            setPlaceholder('');
        }
    };

    function filterJobs(currentTags: string[] = tags) {
        const fjobs = jobs.filter((job: Job) => {
            const lowerCaseTags = currentTags.map(tag => tag.toLowerCase());
            return lowerCaseTags.every(tag =>
                (job.companyName?.toLowerCase().includes(tag) || false) ||
                job.jobTitle.toLowerCase().includes(tag) ||
                (job.location?.toLowerCase().includes(tag) || false) ||
                (job.jobType?.toLowerCase().includes(tag) || false) ||
                (job.experienceLevel?.toLowerCase().includes(tag) || false) ||
                (typeof job.jobDescription === 'string' && job.jobDescription.toLowerCase().includes(tag))
            );
        });
        setFilteredJobs(fjobs);
    }

    useEffect(() => {
        if (newTagIndex !== null) {
            const timer = setTimeout(() => {
                setNewTagIndex(null);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [newTagIndex]);

    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        if (newTags.length === 0 && inputValue === '') {
            setPlaceholder('Type keyword, company or location');
        }
    };

    const handleWheel = (e: WheelEvent) => {
        if (bubleFieldRef.current) {
            bubleFieldRef.current.scrollLeft += e.deltaY;
        }
    };

    const toggleFilter = (e: React.MouseEvent) => {
        e.stopPropagation(); // Event'in yayılmasını engelle
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        const bubleField = bubleFieldRef.current;
        if (bubleField) {
            bubleField.addEventListener('wheel', handleWheel);
            return () => {
                bubleField.removeEventListener('wheel', handleWheel);
            };
        }
    }, []);

    const handleFocus = () => {
        setPlaceholder('');
        setIsFaded(false);
    };

    const handleBlur = () => {
        if (inputValue === '' && tags.length === 0) {
            setPlaceholder('Type keyword, company or location');
        } else {
            setIsFaded(true);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value !== '') {
            setIsFaded(false);
        }
    };

    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="search-container" onClick={handleContainerClick}>
            <svg 
                className="search-bar-icon search-icon" 
                width="24" 
                height="36" 
                viewBox="0 0 37 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M34.838 35.57L27.2686 28.6192C25.8551 29.8226 24.2295 30.7541 22.3918 31.4138C20.5542 32.0734 18.7076 32.4033 16.852 32.4033C12.3239 32.4033 8.49147 30.8359 5.35475 27.701C2.21851 24.5662 0.650391 20.7361 0.650391 16.2108C0.650391 11.685 2.2178 7.85168 5.35263 4.71072C8.48746 1.57024 12.3175 0 16.8428 0C21.3686 0 25.202 1.56812 28.3429 4.70436C31.4834 7.84108 33.0537 11.6735 33.0537 16.2016C33.0537 18.166 32.7057 20.067 32.0097 21.9047C31.3138 23.7423 30.4004 25.3135 29.2695 26.6182L36.8389 33.5698C36.8389 33.5698 36.2291 34.1793 35.8384 34.5699C35.4477 34.9605 34.838 35.57 34.838 35.57ZM16.852 29.5761C20.6032 29.5761 23.77 28.2848 26.3526 25.7022C28.9352 23.1201 30.2265 19.9533 30.2265 16.2016C30.2265 12.45 28.9352 9.28315 26.3526 6.70103C23.77 4.11844 20.6032 2.82714 16.852 2.82714C13.1004 2.82714 9.93354 4.11844 7.35142 6.70103C4.76883 9.28315 3.47753 12.45 3.47753 16.2016C3.47753 19.9533 4.76883 23.1201 7.35142 25.7022C9.93354 28.2848 13.1004 29.5761 16.852 29.5761Z" />
            </svg>

            <div className="search-input" tabIndex={0}>
                <div className="buble-field" ref={bubleFieldRef}>
                    {tags.map((item, index) => (
                        <div key={index} className="buble">
                            <span>{item}</span>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTag(index);
                                }}
                                style={{ marginLeft: '5px', cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </div>
                <input
                    className={`search-input-element ${isFaded ? 'faded' : ''}`}
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={inputRef}
                />
            </div>

            <div className="filter-icon-container" onClick={(e) => e.stopPropagation()}>
                <Icon
                    onClick={toggleFilter}
                    hoverSize={45}
                    hoverContent="Filter"
                    width={28}
                    tooltipPosition="bottom"
                >
                    <svg width="28" height="35" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon'>
                        <path d="M0 5C0 4.44772 0.447715 4 1 4H8V6H1C0.447715 6 0 5.55228 0 5Z" fill="#242220" fill-opacity="0.4"/>
                        <path d="M37 5C37 5.55228 36.5523 6 36 6L16 6V5V4L36 4C36.5523 4 37 4.44772 37 5Z" fill="#242220" fill-opacity="0.4"/>
                        <path d="M17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5Z" fill="#A7A7A6"/>
                        <path d="M37 19C37 19.5523 36.5523 20 36 20H29V18H36C36.5523 18 37 18.4477 37 19Z" fill="#242220" fill-opacity="0.4"/>
                        <path d="M0 19C0 18.4477 0.447715 18 1 18L21 18V19V20L1 20C0.447715 20 0 19.5523 0 19Z" fill="#242220" fill-opacity="0.4"/>
                        <path d="M20 19C20 16.2386 22.2386 14 25 14C27.7614 14 30 16.2386 30 19C30 21.7614 27.7614 24 25 24C22.2386 24 20 21.7614 20 19Z" fill="#A7A7A6"/>
                        <path d="M22 19C22 17.3431 23.3431 16 25 16C26.6569 16 28 17.3431 28 19C28 20.6569 26.6569 22 25 22C23.3431 22 22 20.6569 22 19Z" fill="white"/>
                        <path d="M9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5Z" fill="white"/>
                    </svg>
                </Icon>
            </div>

            <div className='JobFilterPopUp'>
                {modalOpen && (
                    <JobFilterPopUp modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
