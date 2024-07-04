"use client";
import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const data = { email };
  
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      console.error('Error submitting email:', error);
    }
  }

  return (
    <div className={styles.MainDiv}>
      <span className={styles.Join}>Join the pre-launch exclusive club to unlock premium access to CoinMarketJob!</span>
      <div style={{display: 'flex', marginTop: '20px'}}>
        <input className={styles.Mail} ref={emailRef} placeholder="Enter email..." 
        value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{height: "30px"}}>
        <span className={styles.SuccessMessage}>
          {success ? "Successfully joined! You will be notified soon…" : ''}
        </span>
      </div>
    </div>
  );
}
