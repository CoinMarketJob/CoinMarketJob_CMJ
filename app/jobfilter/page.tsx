"use client"
import React, { useState } from 'react';
import './page.css'; 
import Selection from '../components/general/CheckboxSelection';
import RangeSlider from '../components/general/Slider';
import ToggleSwitch from '../components/general/Toggle';


const JobFilter: React.FC = () => {
  const [datePosted, setDatePosted] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([100, 800]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);

  const dateOptions = [
    { id: 'last24Hours', label: 'Last 24 Hours' },
    { id: 'last3Days', label: 'Last 3 days' },
    { id: 'lastWeek', label: 'Last Week' },
    { id: 'last2Weeks', label: 'Last 2 Weeks' },
    { id: 'lastMonth', label: 'Last Month' }
  ];

  const locationOptions = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'Onsite' }
  ];

  const jobTypeOptions = [
    { id: 'Internship', label: 'Internship' },
    { id: 'PartTime', label: 'Part-time' },
    { id: 'FullTime', label: 'Full-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Temporary', label: 'Temporary' },
    { id: 'Other', label: 'Other' }
  ];

  const salaryOptions = [
    { id: 'value', label: 'Value', sublabel: 'Under $100' },
    { id: 'midRange', label: 'Mid-range', sublabel: '$100-$200' },
    { id: 'highEnd', label: 'High-end', sublabel: 'Above $200' }
  ];

  const experienceLevelOptions = [
    { id: 'entryLevel', label: 'Entry-Level' },
    { id: 'junior', label: 'Junior' },
    { id: 'midLevel', label: 'Mid-Level' },
    { id: 'senior', label: 'Senior' },
    { id: 'lead', label: 'Lead' },
    { id: 'manager', label: 'Manager' },
    { id: 'executive', label: 'Executive' }
  ];

  const handleSalaryChange = (minValue: number, maxValue: number) => {
    setSalaryRange([minValue, maxValue]);
  };

  return (
    <div className="filter-wrapper">
        <div className="filter-group">
          <div className="left-group">
            <Selection
              name="Date Posted"
              id="datePosted"
              value={datePosted}
              onChange={setDatePosted}
              list={dateOptions}
              multiple={false}
            />
            <div className="salary-experience">
              <Selection
                name="Salary"
                id="salary"
                value={salary}
                onChange={setSalary}
                list={salaryOptions}
                multiple={true}
              />
              <div className="custom-slider">
                <RangeSlider
                  min={100}
                  max={800}
                  step={1}
                  onRangeChange={handleSalaryChange}
                />
              </div>
            </div>
          </div>
          <div className="centered-group">
            <Selection
              name="Location"
              id="location"
              value={location}
              onChange={setLocation}
              list={locationOptions}
              multiple={true}
            />
            <Selection
              name="Experience Level"
              id="experienceLevel"
              value={experienceLevel}
              onChange={setExperienceLevel}
              list={experienceLevelOptions}
              multiple={true}
            />
          </div>
          <div className="right-aligned-group">
            <Selection
              name="Job Type"
              id="jobType"
              value={jobType}
              onChange={setJobType}
              list={jobTypeOptions}
              multiple={true}
            />
            <div className="toggles">
            <ToggleSwitch title="Actively Hiring" sliderName='slider1'/>
            <ToggleSwitch title="Visa Sponsorship" sliderName='slider2'/>
            </div>
            
              <div className="button-container">
                <button onClick={() => console.log('Reset filters')}>Reset</button>
                <button onClick={() => console.log('Apply filters')}>Apply</button>
              </div>
            
          </div>
        </div>
      </div>
    
  );
};

export default JobFilter;