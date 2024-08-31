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

const JobFilterPopUp: React.FC = () => {
  const { jobs, filteredJobs, setFilteredJobs } = useJobs();
  const [datePosted, setDatePosted] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0,8000]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [visaSponsorship, setVisaSponsorship] = useState<boolean | undefined>(false);
  // const [activelyHiring, setActivelyHiring] = useState<boolean | undefined>(false);
  const [isAlertSet, setIsAlertSet] = useState(false);
  const [location, setlocation] = useState<string[]>([]);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  interface Job {
    location?: string;
    locationType?: string | null | undefined;
    jobType?: string;
    experienceLevel?: string;
    packageId?: number;
    salaryMin?: number;
    salaryMax?: number;
    datePosted?: string;
    visaSponsorship?: boolean;
    // activelyHiring?: boolean;
  }
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
    { id: 'OnSite', label: 'Onsite' }
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
    { id: 'value', label: 'Value', sublabel: 'Under $100' },
    { id: 'midRange', label: 'Mid-range', sublabel: '$100-$200' },
    { id: 'highEnd', label: 'High-end', sublabel: 'Above $200' }
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
  };

  const handleAlertClick = () => {
    setIsAlertSet(!isAlertSet);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsPopupVisible(false);  // Close the modal if the click is outside
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupVisible]);

  const toggleFilter = () => {
    setIsPopupVisible(prevState => !prevState);  // Toggle the modal visibility
  };

  function filterJobs() {
    const fjobs = jobs.filter((job: Job) => {
      const jobTypeLower = (job.jobType ?? '').toLowerCase();
      const experienceLevelLower = (job.experienceLevel ?? '').toLowerCase();
      const matchesJobType = jobType.length === 0 || jobType.some(type => type.toLowerCase() === jobTypeLower);
      const matchesExperienceLevel = experienceLevel.length === 0 || experienceLevel.some(level => level.toLowerCase() === experienceLevelLower);
      const matchesLocation = location.length === 0 || location.some(loc => job.location?.toLowerCase() === loc.toLowerCase());
      const matchesDatePosted = datePosted.length === 0 || datePosted.includes((job.datePosted ?? '').toLowerCase());
      const matchesLocationType = locationType.length === 0 || locationType.some(loc => job.locationType?.toLowerCase().includes(loc.toLowerCase()));
      const matchesSalaryRange = 
      (job.salaryMin ?? 0) >= salaryRange[0] &&
      (job.salaryMax !== undefined ? job.salaryMax <= salaryRange[1] : salaryRange[1] === Number.MAX_VALUE);

      const matchesVisaSponsorship = !visaSponsorship || job.visaSponsorship === visaSponsorship;
      // const matchesActivelyHiring = !activelyHiring || job.activelyHiring === activelyHiring;
      return matchesLocationType && matchesDatePosted && matchesJobType && matchesExperienceLevel  && matchesVisaSponsorship && matchesLocation && matchesSalaryRange;
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
    visaSponsorship: false,
    activelyHiring: false,
    isAlertSet: false
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
      experienceLevel.length !== initialFilters.experienceLevel.length ||
      visaSponsorship !== initialFilters.visaSponsorship ||
      // activelyHiring !== initialFilters.activelyHiring ||
      isAlertSet !== initialFilters.isAlertSet;
    setIsResetDisabled(!filtersChanged);
  }, [datePosted, location, jobType, salary, salaryRange, experienceLevel, visaSponsorship, isAlertSet]);

  useEffect(() => {
    checkIfFiltersChanged();
  }, [datePosted, location, jobType, salary, salaryRange, experienceLevel, visaSponsorship, checkIfFiltersChanged]);

  return (
    <>
      {isPopupVisible && (
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
                  <div
  className={`${styles.setAlert} ${isAlertSet ? styles.active : ''}`}
  onClick={handleAlertClick}
>
  <span>Set Alert</span>
  {isAlertSet ? (
    <svg className={styles.plusIconActive} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) : (
    <svg className={styles.plusIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  )}
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
                        type.toLowerCase() === 'hybrid' || type.toLowerCase() === 'onsite'
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
                  <div className={styles.toggles}>
                    {/* <ToggleSwitch
                      title="Actively Hiring"
                      sliderName="slider1"
                      switchState={activelyHiring}
                      setSwitchState={setActivelyHiring}
                    /> */}
                    <ToggleSwitch
                      title="Visa Sponsorship"
                      sliderName="slider2"
                      switchState={visaSponsorship}
                      setSwitchState={(newValue) => {
                        console.log("Visa Sponsorship toggled:", newValue); // Add this line
                        setVisaSponsorship(newValue);
                      }}
                    />
                  </div>
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
                        setVisaSponsorship(false);
                        //setActivelyHiring(false);
                        setIsAlertSet(false);
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
                      onClick={() => {
                        handleApply()
                      }}
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
      )}
    </>
  );
  
  
};

export default JobFilterPopUp;