import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'

const BillingEmail = forwardRef((props, ref) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    useImperativeHandle(ref, () => ({
        getSavedEmail: () => {
            if (email && validateEmail(email)) {
                setError("");
                return email;
            } else {
                setError("Please enter a valid email address.");
                setEmailError(true);
                return null;
            }
        }
    }));

    return (
        <div>
            <div className={styles.CreditCardText}>Billing email</div>
            <div>
                <Input 
                    id="Email" 
                    placeholder="Email address" 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                    }} 
                    error={emailError}
                />
            </div>
            {error && <div className={styles.ErrorMessage}>{error}</div>}
        </div>
    )
})

BillingEmail.displayName = 'BillingEmail';

export default BillingEmail
