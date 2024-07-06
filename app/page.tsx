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
      <div style={{display: 'flex',height: '15vh', position: 'relative'}}></div>
      <div className={styles.Title}>CoinMarketJob</div>
      <div style={{display: 'flex',height: '10px', position: 'relative'}}></div>
      <span className={styles.Join}>CONNECTING MINDS AND JOBS</span> 
      <div style={{display: 'flex',height: '140px', position: 'relative'}}></div>
      <span className={styles.Club}>JOIN THE <span className={styles.Launch}>PRE-LAUNCH</span> CLUB</span> 
      <span className={styles.Description}>Get exclusive early access and be the first to know when the launch.</span>
      <div style={{display: 'flex',height: '50px', position: 'relative'}}></div>
      <div style={{display: 'flex', flexDirection: 'column', width: '220px'}}>
        <input className={styles.Mail} ref={emailRef} placeholder="Email" 
        value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <button onClick={handleSubmit} className={styles.button} >Join the waitlist</button>
      </div>

      <div style={{display: 'flex', marginTop: '8px', justifyContent: 'center'}}>
        <a className={styles.socialMediaX} href='https://x.com/CoinMarketJob' target='_blank'><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" clip-rule="evenodd" baseProfile="basic"><g opacity=".3"><polygon fill="#fff" fill-rule="evenodd" points="16.002,19 6.208,5 8.255,5 18.035,19" clip-rule="evenodd"/><polygon points="8.776,4 4.288,4 15.481,20 19.953,20 8.776,4"/></g><polygon fill-rule="evenodd" points="10.13,12.36 11.32,14.04 5.38,21 2.74,21" clip-rule="evenodd"/><polygon fill-rule="evenodd" points="20.74,3 13.78,11.16 12.6,9.47 18.14,3" clip-rule="evenodd"/><path d="M8.255,5l9.779,14h-2.032L6.208,5H8.255 M9.298,3h-6.93l12.593,18h6.91L9.298,3L9.298,3z"/></svg></a>
        <a className={styles.socialMedia} href='https://www.instagram.com/coinmarketjob/' target="_blank"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg></a>
      </div>
      <div style={{height: "30px"}}>
        <span className={styles.SuccessMessage}>
          {success ? "Successfully joined! You will be notified soon…" : ''}
        </span>
      </div>
    </div>
  );
}
