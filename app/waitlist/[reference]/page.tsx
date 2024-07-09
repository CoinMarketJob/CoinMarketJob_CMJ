/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from 'react';
import ReferralLink from "../../components/ReferenceLink";
import Icon from "@/app/components/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

type ReferenceProps = {
    reference : string
}

function encodeEmail(email: string): string {
  // E-postayı Base64'e çevir
  const base64 = btoa(email);
  
  // Base64 stringini hex formatına çevir
  const hexString = base64.split('').map(char => {
    return char.charCodeAt(0).toString(16).padStart(2, '0');
  }).join('');
  
  return hexString;
}

function decodeEmail(encoded: string): string {
  // Hex stringini Base64 formatına çevir
  const base64 = encoded.match(/.{1,2}/g)?.map(hex => {
    return String.fromCharCode(parseInt(hex, 16));
  }).join('') || '';
  
  // Base64'ten geri çözümle
  return atob(base64);
}

const page = ({params}: {params: ReferenceProps}) => {
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
      const referenceMail = decodeEmail(params.reference);
      const data = { email, referenceMail };
  
      const response = await fetch('/api/user/reference', {
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

  
  const visitMail = () => {
    window.location.href = `mailto:?to=info@coinmarketjob.com`;
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
                                <span className={styles.SucccessText}>Success! You're on the waitlist.</span>
                                <p className={styles.DesText}>Refer your friends with the link below to move up!</p>
                                <ReferralLink link={referenceLink} />
                              </div>
                            </div>) : (
                  <div className={styles.Description}>
                    <div className={styles.DescriptionContent}>
                      <span className={styles.JoinClub}>JOIN THE <span className={styles.Launch}>PRE-LAUNCH</span> CLUB</span>
                      <p className={styles.DescriptionText}>Get exclusive early access and <span style={{marginRight: '0.2px'}}></span> be the first to know when the launch.</p>

                      
                      <input className={styles.Mail} ref={emailRef} placeholder="Email" 
                      value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                      <button onClick={handleSubmit} className={styles.button} >Join the waitlist</button>
                      
                      <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}>
                      <Icon size={32}>
                          <a className={styles.socialMedia} style={{marginTop: '4px'}} href='https://x.com/CoinMarketJob' target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="23px" height="23px"><g className="svg-icon-social" fill-opacity="0.4" fill="#242220" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(10.66667,10.66667)"><path d="M2.36719,3l7.0957,10.14063l-6.72266,7.85938h2.64063l5.26367,-6.16992l4.31641,6.16992h6.91016l-7.42187,-10.625l6.29102,-7.375h-2.59961l-4.86914,5.6875l-3.97266,-5.6875zM6.20703,5h2.04883l9.77734,14h-2.03125z"></path></g></g></svg>
                          </a>
                        </Icon>
                        <Icon size={32}>
                            <a className={styles.socialMedia} style={{marginTop: '4px'}} href='https://www.instagram.com/coinmarketjob/' target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="21px" height="21px"><g className="svg-icon-social" fill-opacity="0.4" fill="#242220" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.16752,0 -13,5.83248 -13,13v18c0,7.16752 5.83248,13 13,13h18c7.16752,0 13,-5.83248 13,-13v-18c0,-7.16752 -5.83248,-13 -13,-13zM16,5h18c6.08648,0 11,4.91352 11,11v18c0,6.08648 -4.91352,11 -11,11h-18c-6.08648,0 -11,-4.91352 -11,-11v-18c0,-6.08648 4.91352,-11 11,-11zM37,11c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM25,14c-6.06329,0 -11,4.93671 -11,11c0,6.06329 4.93671,11 11,11c6.06329,0 11,-4.93671 11,-11c0,-6.06329 -4.93671,-11 -11,-11zM25,16c4.98241,0 9,4.01759 9,9c0,4.98241 -4.01759,9 -9,9c-4.98241,0 -9,-4.01759 -9,-9c0,-4.98241 4.01759,-9 9,-9z"></path></g></g></svg>                            </a>
                        </Icon>

                        
                        <Icon size={32} marginLeft>
                          <a className={styles.socialMediaMail} style={{marginTop: '3.5px'}} onClick={() => visitMail()}>
                            
                          <svg fill="#24222066" height="23.5px" width="23.5px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512" className="svg-icon-social">
                          <g transform="translate(1 1)">
                            <g>
                              <path d="M479.685,60.644c-4.1-1.269-8.451-1.911-13.058-1.911H43.373c-4.608,0-8.959,0.642-13.059,1.911
                                C12.065,66.141-1,82.917-1,103.107v303.787c0,12.278,4.835,23.291,12.725,31.276c0.277,0.412,0.58,0.802,0.928,1.15
                                c2.215,1.993,4.605,3.751,7.12,5.27c6.256,3.889,13.578,6.264,21.484,6.624c0.705,0.034,1.41,0.052,2.115,0.052h423.253
                                c0.705,0,1.411-0.018,2.115-0.052C492.482,450.133,511,430.93,511,406.893V103.107C511,82.917,497.934,66.141,479.685,60.644z
                                M305.461,262.573L490.591,89.785c2.135,3.915,3.343,8.445,3.343,13.321v303.787c0,5.426-1.496,10.422-4.102,14.62
                                L305.461,262.573z M466.627,75.8c0.502,0,0.99,0.014,1.469,0.038c0.239,0.012,0.474,0.034,0.711,0.052
                                c0.257,0.019,0.517,0.035,0.769,0.062c0.123,0.013,0.243,0.031,0.365,0.045c2.81,0.339,5.297,1.122,7.779,2.364L289.769,254.107
                                c-1.11,0.393-2.19,0.993-3.195,1.747l-6.827,5.973c-14.507,13.653-36.693,13.653-51.2,0l-0.923-0.807L32.28,78.36
                                c2.482-1.241,4.969-2.025,7.779-2.364c0.122-0.014,0.242-0.032,0.365-0.045c0.252-0.027,0.512-0.042,0.77-0.062
                                c0.237-0.018,0.472-0.04,0.711-0.052c0.479-0.024,0.967-0.038,1.469-0.038H466.627z M19.593,420.538
                                c-2.247-3.989-3.526-8.633-3.526-13.645V103.107c0-4.876,1.208-9.406,3.343-13.321l184.31,172.023L19.593,420.538z M43.373,434.2
                                c-2.768,0-5.536-0.563-8.305-1.23c-0.601-0.184-1.19-0.394-1.771-0.617l183.681-158.169l0.476,0.444
                                c3.516,2.975,7.204,5.518,11.036,7.608c20.16,11.555,46.703,9.023,64.058-7.608l0.885-0.826l183.272,158.551
                                c-0.582,0.223-1.17,0.433-1.772,0.618c-2.768,0.667-5.536,1.23-8.305,1.23H43.373z"/>
                            </g>
                          </g>
                          </svg>
                          </a>
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

export default page
