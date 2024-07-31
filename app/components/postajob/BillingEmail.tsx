import React, { useState } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'
import Button from '../general/Button';

const BillingEmail = () => {
    const [email, setEmail] = useState("");

  return (
    <div>
        <div className={styles.CreditCardText}>Billing email</div>
        <div><Input id="Email" placeholder="Email adress" type="mail" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
    </div>
  )
}

export default BillingEmail

