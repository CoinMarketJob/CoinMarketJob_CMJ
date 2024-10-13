import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'
import Dropdown from '../general/Dropdown';

const BillingAddress = forwardRef((props, ref) => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    const countries = [
      { value: "Turkey",    label: "Turkey" },
      { value: "ABD",       label: "ABD" },
      { value: "France",  label: "France" },
      { value: "Germany",  label: "Germany" }
    ];

    const validateFields = () => {
        setAddressError(!address);
        setCityError(!city);
        setZipCodeError(!zipCode);
        setCountryError(!country);

        return address && city && zipCode && country;
    }

    useImperativeHandle(ref, () => ({
      getSavedAddress: () => {
        if (validateFields()) {
          setError(""); // Clear any previous error
          return `${address}, ${zipCode}, ${city}, ${country}`;
        } else {
          setError("Please fill in all fields before saving.");
          return null;
        }
      }
    }));

  return (
    <div>
        <div className={styles.CreditCardText}>Billing Address</div>
        <div>
          <Input 
            id="Address" 
            placeholder="Address" 
            type="text" 
            required 
            value={address} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAddress(e.target.value);
              setAddressError(false);
            }} 
            error={addressError}
          />
        </div>

        <div style={{display: "flex", marginTop: "16px"}}>
          <div style={{marginRight: "16px"}}>
            <Input 
              id="City" 
              placeholder="City" 
              type="text" 
              required 
              value={city} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCity(e.target.value);
                setCityError(false);
              }} 
              error={cityError}
            />
          </div>
          <div>
            <Input 
              id="ZipCode" 
              placeholder="Zip Code" 
              type="text" 
              required 
              value={zipCode} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setZipCode(e.target.value);
                setZipCodeError(false);
              }} 
              error={zipCodeError}
            />
          </div>
        </div>
        
        <div style={{ marginTop: "16px"}}>
          <Dropdown 
            id="Country" 
            value={country} 
            list={countries} 
            setValue={(value) => {
              setCountry(value);
              setCountryError(false);
            }}  
            placeholder="Country"
            error={countryError}
          />
        </div>

        {error && <div className={styles.ErrorMessage}>{error}</div>}
    </div>
  )
})

BillingAddress.displayName = 'BillingAddress';

export default BillingAddress
