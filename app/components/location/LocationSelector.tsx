"use client"
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './LocationSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface JobTitleProps {
    selectedLocations: string[];
    setSelectedLocations: Dispatch<SetStateAction<string[]>>
}

const LocationSelector: React.FC<JobTitleProps> = ({selectedLocations, setSelectedLocations}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [locations, setLocations] = useState<Array<any>>([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (value: string) => {
        setSelectedLocations(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const filteredLocations = locations.filter(location =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        async function fetchData() {
          try {
              const response = await fetch('/api/cities/');
              const data = await response.json();
              console.log(data);
              setLocations(data);
          } catch (error) {
              console.error('Veri getirme hatası:', error);
          }
        }
    
        fetchData();
      }, []);


    return (
        <div style={{ position: 'relative'}}>
            <div onClick={toggleDropdown}>
                <span className={styles.LocationText}>Location</span>
              <FontAwesomeIcon icon={faChevronDown} 
                style={{width: '18.6px', height: '18.6px', overflow: 'visible', verticalAlign: '-0.125em', color: '#999999'}}
                className={styles.Arrow} rotation={isOpen ? 180 : undefined} />            </div>
            {isOpen && (
                <div className={styles.DropDownDiv}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px'
                        }}
                    >
                        {/* <FaSearch style={{ marginRight: '8px' }} /> */}
                        <input
                            type="text"
                            placeholder="Location"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={styles.SearchInput}
                        />
                    </div>
                    {filteredLocations.map(location => (
                        <div key={location.id} style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedLocations.includes(location.city)}
                                    onChange={() => handleCheckboxChange(location.city)}
                                    style={{ marginRight: '8px' }}
                                />
                                {location.city}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
