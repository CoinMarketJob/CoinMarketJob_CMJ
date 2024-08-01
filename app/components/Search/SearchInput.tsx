"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchInput.css';
import React, { useState, useRef, useEffect } from 'react';
import { faMagnifyingGlass, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useJobs } from '@/hooks/useJobs';
import { useRouter } from 'next/navigation';

interface Job {
    companyName: string;
    jobTitle: string;
    location: string;
    jobType: string;
    experienceLevel: string;
    jobDescription?: string | number | boolean | any[] | Record<string, any> | null;
}

interface SearchProps {
    tags: Array<string>;
    setTags: (tags: Array<string>) => void;
}

const SearchInput: React.FC<SearchProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const [newTagIndex, setNewTagIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const bubleFieldRef = useRef<HTMLDivElement>(null);
    const { jobs, filteredJobs, setFilteredJobs } = useJobs();
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && inputValue) {
            e.preventDefault();
            setTags([...tags, inputValue]);
            setNewTagIndex(tags.length);
            setInputValue('');
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            filterJobs();
            console.log(filteredJobs);
        }
    };

    function filterJobs() {
        const fjobs = jobs.filter((job: Job) => {
            const lowerCaseTags = tags.map(tag => tag.toLowerCase());
            return lowerCaseTags.every(tag =>
                job.companyName.toLowerCase().includes(tag) ||
                job.jobTitle.toLowerCase().includes(tag) ||
                job.location.toLowerCase().includes(tag) ||
                job.jobType.toLowerCase().includes(tag) ||
                job.experienceLevel.toLowerCase().includes(tag) ||
                (typeof job.jobDescription === 'string' && job.jobDescription.toLowerCase().includes(tag))
            );
        });
        setFilteredJobs(fjobs);
    }

    useEffect(() => {
        if (newTagIndex !== null) {
            const timer = setTimeout(() => {
                setNewTagIndex(null);
            }, 50); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [newTagIndex]);

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleWheel = (e: WheelEvent) => {
        if (bubleFieldRef.current) {
            bubleFieldRef.current.scrollLeft += e.deltaY;
        }
    };

    const filter = () => {
        console.log("Test");
        router.push("/jobfilter");
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

    return (
        <div style={{ position: 'relative' }}>
            <svg className="search-bar-icon search-icon" width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.7" d="M34.838 35.57L27.2686 28.6192C25.8551 29.8226 24.2295 30.7541 22.3918 31.4138C20.5542 32.0734 18.7076 32.4033 16.852 32.4033C12.3239 32.4033 8.49147 30.8359 5.35475 27.701C2.21851 24.5662 0.650391 20.7361 0.650391 16.2108C0.650391 11.685 2.2178 7.85168 5.35263 4.71072C8.48746 1.57024 12.3175 0 16.8428 0C21.3686 0 25.202 1.56812 28.3429 4.70436C31.4834 7.84108 33.0537 11.6735 33.0537 16.2016C33.0537 18.166 32.7057 20.067 32.0097 21.9047C31.3138 23.7423 30.4004 25.3135 29.2695 26.6182L36.8389 33.5698C36.8389 33.5698 36.2291 34.1793 35.8384 34.5699C35.4477 34.9605 34.838 35.57 34.838 35.57ZM16.852 29.5761C20.6032 29.5761 23.77 28.2848 26.3526 25.7022C28.9352 23.1201 30.2265 19.9533 30.2265 16.2016C30.2265 12.45 28.9352 9.28315 26.3526 6.70103C23.77 4.11844 20.6032 2.82714 16.852 2.82714C13.1004 2.82714 9.93354 4.11844 7.35142 6.70103C4.76883 9.28315 3.47753 12.45 3.47753 16.2016C3.47753 19.9533 4.76883 23.1201 7.35142 25.7022C9.93354 28.2848 13.1004 29.5761 16.852 29.5761Z" fill="#242220" fill-opacity="0.4"/>
            </svg>

            <div className="buble-field" ref={bubleFieldRef}>
                {tags.map((item, index) => (
                    <div
                        key={index}
                        className={`buble ${newTagIndex === index ? 'animate-from-input' : ''}`}
                        style={newTagIndex === index && inputRef.current ? {
                            top: inputRef.current.offsetTop,
                            left: inputRef.current.offsetLeft,
                            transform: `translate(0, 0)`
                        } : {}}
                    >
                        <div>{item}</div>
                        <div className='Icons'>
                            <div className='Overlay' onClick={() => handleRemoveTag(index)}>
                                <FontAwesomeIcon icon={faTimes} style={{ width: 16, height: 16, overflow: "visible" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <input
                className="search-input"
                type="text"
                placeholder='Type keyword, company or location'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <div className="filter-div" onClick={filter}>
                <svg className="search-bar-icon filter-icon" width="37" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5C0 4.44772 0.447715 4 1 4H8V6H1C0.447715 6 0 5.55228 0 5Z" fill="#242220" fill-opacity="0.4"/>
                    <path d="M37 5C37 5.55228 36.5523 6 36 6L16 6V5V4L36 4C36.5523 4 37 4.44772 37 5Z" fill="#242220" fill-opacity="0.4"/>
                    <path d="M17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5Z" fill="#A7A7A6"/>
                    <path d="M37 19C37 19.5523 36.5523 20 36 20H29V18H36C36.5523 18 37 18.4477 37 19Z" fill="#242220" fill-opacity="0.4"/>
                    <path d="M0 19C0 18.4477 0.447715 18 1 18H14V20H1C0.447715 20 0 19.5523 0 19Z" fill="#242220" fill-opacity="0.4"/>
                </svg>
            </div>
        </div>
    );
};

export default SearchInput;
