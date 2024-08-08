import React, { useState } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'
import Button from '../general/Button';
import Dropdown from '../general/Dropdown';

const BillingAddress = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [california, setCalifornia] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    const countries = [
      { value: "Turkey",    label: "Turkey" },
      { value: "ABD",       label: "ABD" },
      { value: "France",  label: "France" },
      { value: "Germany",  label: "Germany" }
    ];

  return (
    <div>
        <div className={styles.CreditCardText}>Billing Address</div>
        <div>
          <Input id="Address" placeholder="Address" type="text" required value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
        </div>

        <div style={{display: "flex", marginTop: "16px"}}>
          <div style={{marginRight: "16px"}}>
            <Input id="City" placeholder="City" type="text" required value={city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} />
          </div>
          <div>
            <Input id="California" placeholder="California" type="text" required value={california} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalifornia(e.target.value)} />
          </div>
        </div>
        
        <div style={{ marginTop: "16px"}}>
          <Input id="California" placeholder="California" type="text" required value={zipCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value)} />
        </div>
        
        <div style={{ marginTop: "16px"}}>
          <Dropdown id="California" value={country} list={countries} setValue={setCountry}  />
        </div>
    </div>
  )
}

export default BillingAddress
