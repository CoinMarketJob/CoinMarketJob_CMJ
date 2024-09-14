import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './CreditCard.module.css'
import Input from '../general/Input'

interface CreditCardProps {
  onSave: (cardNumber: string, cardType: string) => void;
}

export interface CreditCardRef {
  handleSave: () => boolean;
}

const CreditCard = forwardRef<CreditCardRef, CreditCardProps>(({ onSave }, ref) => {
    const [cardNumber, setCardNumber] = useState("");
    const [error, setError] = useState("");
    const [cardType, setCardType] = useState("");

    const getCardType = (number: string): string => {
        // Regex patterns for card types
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6(?:011|5)/,
            dinersclub: /^3(?:0[0-5]|[68])/,
            jcb: /^(?:2131|1800|35\d{3})/
        };

        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) {
                return type;
            }
        }
        return "";
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCardNumber(value);
        setError("");
        const newCardType = getCardType(value);
        setCardType(newCardType);
    }

    const validateCreditCard = (number: string) => {
        // Basic Luhn algorithm for credit card validation
        let sum = 0;
        let isEven = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }

    const handleSave = () => {
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            setError("Invalid card number length");
            return false;
        }
        if (!validateCreditCard(cardNumber)) {
            setError("Invalid credit card number");
            return false;
        }
        if (cardType === "Unknown") {
            setError("Unrecognized card type");
            return false;
        }
        onSave(cardNumber, cardType);
        return true;
    }

    useImperativeHandle(ref, () => ({
        handleSave
    }));

    return (
        <div>
            <div className={styles.CreditCardText}>Credit card</div>
            <div className={styles.inputWrapper}>
                <Input 
                    id="Card" 
                    placeholder="Card number" 
                    type="number" 
                    required 
                    value={cardNumber} 
                    onChange={change} 
                    className={styles.cardInput}
                />
                {cardType && <div className={styles.CardType}>{cardType}</div>}
            </div>
            {error && <div className={styles.ErrorText}>{error}</div>}
        </div>
    )
})

CreditCard.displayName = 'CreditCard';

export default CreditCard
