import React, { useState } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'
import Button from '../general/Button';

const CreditCard = () => {
    const [cardNumber, setCardNumber] = useState("");

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(e.target.value);
    }

  return (
    <div>
        <div className={styles.CreditCardText}>Credit card</div>
        <div><Input id="Card" placeholder="Card number" type="number" required value={cardNumber} onChange={change} /></div>
    </div>
  )
}

export default CreditCard
