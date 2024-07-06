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
      <div style={{display: 'flex',height: '5vh', position: 'relative'}}></div>
      <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'flex-start', width: '90%'}}>
        <div className={styles.Title}>CoinMarketJob</div>
        <div style={{display: 'flex',height: '10px', position: 'relative'}}></div>
        <span className={styles.Join}>CONNECTING MINDS AND JOBS</span> 
      </div>
      <div style={{display: 'flex',height: '25vh', position: 'relative'}}></div>
      <div style={{display: 'flex',height: '140px', position: 'relative'}}></div>
      <span className={styles.Club}>JOIN THE <span className={styles.Launch}>PRE-LAUNCH</span> CLUB</span> 
      <span className={styles.Description}>Get exclusive early access and be the first to know when the launch.</span>
      <div style={{display: 'flex',height: '50px', position: 'relative'}}></div>
      <div style={{display: 'flex'}}>
        <input className={styles.Mail} ref={emailRef} placeholder="Email" 
        value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </div>
      <div className={styles.buttonDiv}>
        <button onClick={handleSubmit} className={styles.button} >Join the waitlist</button>
      </div>
      <div style={{height: "30px"}}>
        <span className={styles.SuccessMessage}>
          {success ? "Successfully joined! You will be notified soon…" : ''}
        </span>
      </div>
    </div>
  );
}
