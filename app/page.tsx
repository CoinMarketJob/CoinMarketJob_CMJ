/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from 'react';
import ReferralLink from "./components/ReferenceLink";
import CryptoJS from 'crypto-js';
import Icon from "./components/Icon";

function encodeEmail(email: string): string {
  // E-postayı Base64'e çevir
  const base64 = btoa(email);
  
  // Base64 stringini hex formatına çevir
  const hexString = base64.split('').map(char => {
    return char.charCodeAt(0).toString(16).padStart(2, '0');
  }).join('');
  
  return hexString;
}

export default function Home() {
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [referenceLink, setReferenceLink] = useState<string>("");

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

      console.log(response);
  
      if (response.ok) {
        const encryptedEmail = encodeEmail(email);
        setReferenceLink("https://www.coinmarketjob.com/waitlist/" + encryptedEmail);
        setSuccess(true);
      } else {
        const errorData = await response.json();
        if(errorData.error == 'Email already exists'){
          const encryptedEmail = encodeEmail(email);
          setReferenceLink("https://www.coinmarketjob.com/waitlist/" + encryptedEmail);
          setSuccess(true);

        }else{
          alert(errorData.error || 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      console.error('Error submitting email:', error);
    }
  }

  return (
    <div>
      <div className={styles.MainDiv}>
        <div className={styles.Grid}>
            <div className={styles.Content}>
              <div className={styles.Full}>
                <span className={styles.Title}>CoinMarketJob</span>
                <p className={styles.ConnectMinds}>CONNECTING MINDS AND JOBS</p>
                {success ? (<div className={styles.Description}>
                              <div className={styles.DescriptionContentSuccess}>
                                <span className={styles.SucccessText}>Success You're on the waitlist.</span>
                                <p className={styles.DesText}>Refer your friends with the link below to move up!</p>
                                <ReferralLink link={referenceLink} />
                              </div>
                            </div>) : (
                  <div className={styles.Description}>
                    <div className={styles.DescriptionContent}>
                      <span className={styles.JoinClub}>JOIN THE <span className={styles.Launch}>PRE-LAUNCH</span> CLUB</span>
                      <p className={styles.DescriptionText}>Get exclusive early access and be &nbsp;the first to know when the launch.</p>
                      
                      <input className={styles.Mail} ref={emailRef} placeholder="Email" 
                      value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                      <button onClick={handleSubmit} className={styles.button} >Join the waitlist</button>
                      
                      <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}>
                        <Icon size={32}>
                          <a className={styles.socialMedia} href='https://x.com/CoinMarketJob' target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="24px" height="24px"><g className="svg-icon-social" fill-opacity="0.4" fill="#242220" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(10.66667,10.66667)"><path d="M2.36719,3l7.0957,10.14063l-6.72266,7.85938h2.64063l5.26367,-6.16992l4.31641,6.16992h6.91016l-7.42187,-10.625l6.29102,-7.375h-2.59961l-4.86914,5.6875l-3.97266,-5.6875zM6.20703,5h2.04883l9.77734,14h-2.03125z"></path></g></g></svg>
                          </a>
                        </Icon>
                        <Icon size={32}>
                            <a className={styles.socialMedia} href='https://www.instagram.com/coinmarketjob/' target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="24px" height="24px"><g className="svg-icon-social" fill-opacity="0.4" fill="#242220" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.16752,0 -13,5.83248 -13,13v18c0,7.16752 5.83248,13 13,13h18c7.16752,0 13,-5.83248 13,-13v-18c0,-7.16752 -5.83248,-13 -13,-13zM16,5h18c6.08648,0 11,4.91352 11,11v18c0,6.08648 -4.91352,11 -11,11h-18c-6.08648,0 -11,-4.91352 -11,-11v-18c0,-6.08648 4.91352,-11 11,-11zM37,11c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM25,14c-6.06329,0 -11,4.93671 -11,11c0,6.06329 4.93671,11 11,11c6.06329,0 11,-4.93671 11,-11c0,-6.06329 -4.93671,-11 -11,-11zM25,16c4.98241,0 9,4.01759 9,9c0,4.98241 -4.01759,9 -9,9c-4.98241,0 -9,-4.01759 -9,-9c0,-4.98241 4.01759,-9 9,-9z"></path></g></g></svg>                            </a>
                        </Icon>
                      </div>
                  </div>
                  
                  </div>)}
                
                </div>        
            </div>
        </div>
      </div>
      
      <div className={styles.footer}>© 2024 COINMARKETJOB</div>
    </div>
  );
}
