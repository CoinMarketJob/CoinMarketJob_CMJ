"use client";
import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import styles from './styles.module.css';
import { useJobs } from '@/hooks/useJobs';
import Selection from '../general/CheckboxSelection';
import RangeSlider from '../general/Slider';
import ToggleSwitch from '../general/Toggle';
import Button from '../general/Button';
import Dropdown from '../general/Dropdown';
import LocationSelector from './LocationSelectorComponent';
import { Job, JobType, LocationType, ExperienceLevel } from '@prisma/client';

const JobFilterModal: React.FC<{ children: ReactNode, modalRef: React.RefObject<HTMLDivElement> }> = ({ children, modalRef }) => {
  return (
    <div className={styles.modalContainer} ref={modalRef}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface JobFilterProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const JobFilterPopUp: React.FC<JobFilterProps> = ({ modalOpen, setModalOpen }) => {
  const { jobs, filteredJobs, setFilteredJobs } = useJobs();
  const [datePosted, setDatePosted] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0,99999999999]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [location, setlocation] = useState<string[]>([]);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleLocationSelector = () => {
    setIsLocationSelectorOpen(!isLocationSelectorOpen);
    
    // Toggle the overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
      if (!isLocationSelectorOpen) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    }
  };

  const chooseLocationOptions = [
    { value: 'Current Location', label: 'Current Location' },
    { value: 'London', label: 'London' },
    { value: 'New York', label: 'New York' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
    { value: 'San Fransisco', label: 'San Fransisco' },
    { value: 'Las Vegas', label: 'Las Vegas' },
  ];

  const chooselocationStrings = chooseLocationOptions.map(option => option.value);

  const dateOptions = [
    { id: 'last24Hours', label: 'Last 24 Hours' },
    { id: 'last3Days', label: 'Last 3 days' },
    { id: 'lastWeek', label: 'Last Week' },
    { id: 'last2Weeks', label: 'Last 2 Weeks' },
    { id: 'lastMonth', label: 'Last Month' }
  ];

  const locationTypeOptions = [
    { id: 'Remote', label: 'Remote' },
    { id: 'Hybrid', label: 'Hybrid' },
    { id: 'Office', label: 'Office' }
  ];

  const jobTypeOptions = [
    { id: 'Internship', label: 'Internship' },
    { id: 'PartTime', label: 'Part-time' },
    { id: 'FullTime', label: 'Full-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Temporary', label: 'Temporary' },
    { id: 'other', label: 'Other' }
  ];

  const salaryOptions = [
    { id: 'value', label: 'Value'},
    { id: 'midRange', label: 'Mid-range' },
    { id: 'highEnd', label: 'High-end' }
  ];

  const experienceLevelOptions = [
    { id: 'EntryLevel', label: 'Entry-Level' },
    { id: 'Junior', label: 'Junior' },
    { id: 'MidLevel', label: 'Mid-Level' },
    { id: 'Senior', label: 'Senior' },
    { id: 'Lead', label: 'Lead' },
    { id: 'Manager', label: 'Manager' },
    { id: 'Executive', label: 'Executive' }
  ];



  const handleSalaryChange = (selectedSalary: string[]) => {
    setSalary(selectedSalary);
  
    if (selectedSalary.includes('value')) {
      setSalaryRange([0, 100]); // Set range for 'Value'
    } else if (selectedSalary.includes('midRange')) {
      setSalaryRange([100, 200]); // Set range for 'Mid-range'
    } else if (selectedSalary.includes('highEnd')) {
      setSalaryRange([200, Number.MAX_VALUE]); // Set range for 'High-end' with effectively unlimited max
    } else {
      setSalaryRange([0, Number.MAX_VALUE]); // Default range if none is selected
    }
  };
  

  const handleApply = () => {
    filterJobs();
    toggleFilter(); // Close the modal
    console.log()
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);  // Close the modal if the click is outside
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalOpen]);

  const toggleFilter = () => {
    setModalOpen(!open);  // Toggle the modal visibility
  };

  function filterJobs() {
    const fjobs = jobs.filter((job: Job) => {
      const jobTypeLower = (job.jobType?.toString() ?? '').toLowerCase();
      const experienceLevelLower = (job.experienceLevel?.toString() ?? '').toLowerCase();
      const matchesJobType = jobType.length === 0 || jobType.some(type => type.toLowerCase() === jobTypeLower);
      const matchesExperienceLevel = experienceLevel.length === 0 || experienceLevel.some(level => level.toLowerCase() === experienceLevelLower);
      const matchesLocation = location.length === 0 || location.some(loc => job.location?.toLowerCase() === loc.toLowerCase());
      const matchesDatePosted = datePosted.length === 0 || datePosted.some(postedDate => {
        const jobDate = new Date(job.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - jobDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        switch (postedDate.toLowerCase()) {
          case 'last 24 hours':
            return diffDays <= 1;
          case 'last 3 days':
            return diffDays <= 3;
          case 'last week':
            return diffDays <= 7;
          case 'last 2 weeks':
            return diffDays <= 14;
          case 'last month':
            return diffDays <= 30;
          default:
            return false;
        }
      });
      
      const matchesLocationType = locationType.length === 0 || locationType.some(loc => job.locationType?.toLowerCase().includes(loc.toLowerCase()));
  
      // Filter by salary range only if the job has salary data
      const matchesSalaryRange = job.salaryMin !== null && job.salaryMax !== null
        ? (job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1])
        : true; // If no salary, ignore the filter
  
      return matchesLocationType && matchesDatePosted && matchesJobType && matchesExperienceLevel && matchesLocation && matchesSalaryRange;
    });
  
    console.log("Filtered Jobs:", fjobs);
    setFilteredJobs(fjobs);
  }
  

  const initialFiltersRef = useRef({
    datePosted: [],
    location: [],
    jobType: [],
    salary: [],
    salaryRange: [100, 800],
    experienceLevel: [],
  });

  const checkIfFiltersChanged = useCallback(() => {
    const initialFilters = initialFiltersRef.current;
    const filtersChanged =
      datePosted.length !== initialFilters.datePosted.length ||
      locationType.length !== initialFilters.location.length ||
      jobType.length !== initialFilters.jobType.length ||
      salary.length !== initialFilters.salary.length ||
      salaryRange[0] !== initialFilters.salaryRange[0] ||
      salaryRange[1] !== initialFilters.salaryRange[1] ||
      experienceLevel.length !== initialFilters.experienceLevel.length;
    setIsResetDisabled(!filtersChanged);
  }, [datePosted, locationType.length, jobType.length, salary.length, salaryRange, experienceLevel.length]);

  useEffect(() => {
    checkIfFiltersChanged();
  }, [datePosted, location, jobType, salary, salaryRange, experienceLevel, checkIfFiltersChanged]);

  return (
    <>
        <div className={styles.filterPage}>
          <JobFilterModal modalRef={modalRef}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterGroup}>
                <div onClick={toggleLocationSelector} className={styles.overlay}></div>
                <div className={styles.leftGroup}>
                  <Selection
                    name="Date Posted"
                    id="datePosted"
                    value={datePosted}
                    onChange={setDatePosted}
                    list={dateOptions}
                    multiple={false}
                  />
                   <div className={styles.salaryExperience}>
                  <Selection
                    name="Salary"
                    id="salary"
                    value={salary}
                    onChange={handleSalaryChange}
                    list={salaryOptions}
                    multiple={true}
                  />
                  </div>
                </div>
                <div className={styles.centeredGroup}>
                <div className={styles.locationSelection}>
                  <div className={styles.locationSelectionSelection}>
                    <Selection
                      name="Location"
                      id="location"
                      value={locationType}
                      onChange={setLocationType}
                      list={locationTypeOptions}
                      multiple={true}
                    />
                  </div>
                  <div
                    className={`${styles.chooseLocation} ${locationType.some(
                      (type) =>
                        type.toLowerCase() === 'hybrid' || type.toLowerCase() === 'office'
                    ) ? styles.visible : ''}`}
                    onClick={toggleLocationSelector}
                  >
                    <LocationSelector
                      label="Choose Location"
                      options={chooselocationStrings}
                      selectedLocation={location}
                      setSelectedLocation={setlocation}
                    />
                  </div>
                </div>
                <div className={styles.experienceLevel}>
                  <Selection
                    name="Experience Level"
                    id="experienceLevel"
                    value={experienceLevel}
                    onChange={setExperienceLevel}
                    list={experienceLevelOptions}
                    multiple={true}
                  />
                </div>
              </div>
                <div className={styles.rightAlignedGroup}>
                  <Selection
                    name="Job Type"
                    id="jobType"
                    value={jobType}
                    onChange={setJobType}
                    list={jobTypeOptions}
                    multiple={true}
                  />
                  <div className={styles.buttonContainer}>
                    <Button
                      text="Reset"
                      onClick={() => {
                        setDatePosted([]);
                        setLocationType([]);
                        setJobType([]);
                        setSalary([]);
                        setSalaryRange([100, 800]);
                        setExperienceLevel([]);
                        setlocation([]);
                      }}
                      backgroundColor="#FFFFFF00"
                      textColor={isResetDisabled ? "#00000099" : "#000000"}
                      borderLine={0}
                      clickedTextColor="#00000099"
                      hoverUnderlineText={true}
                    />
                    <Button
                      text="Apply"
                      onClick={handleApply}
                      backgroundColor="#242220"
                      textColor="#FFFFFF"
                      clickedBackgroundColor="#242220CC"
                      hoverBackgroundColor="#242220"
                    />
                  </div>
                </div>
              </div>
            </div>
          </JobFilterModal>
        </div>
    </>
  );
  
  
};

export default JobFilterPopUp;
