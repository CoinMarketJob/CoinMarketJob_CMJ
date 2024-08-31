"use client";
import React, { useState, useEffect } from 'react';
import Button from '../general/Button';
import Input from '../general/Input';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import './LoginClient.css';

const LoginClient = () => {
  const router = useRouter();
  const [process, setProcess] = useState(0);
  const [loginProcess, setLoginProcess] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add this useEffect hook
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const login = () => {
    setProcess(1);
  };

  const showInput = () => {
    setLoginProcess(1);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const complete = async () => {
    setError(null);
    setIsLoading(true); // Login işlemi başladığında loading'i başlat
    const submitData = { email };
    console.log('Submitting data:', submitData);
  
    try {
      const response = await fetch('/api/user/get', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data);
  
      if (data == null) {
        // User register.
        const registerData = { email, password };
        console.log('Registering user:', registerData);
  
        const registerResponse = await fetch('/api/user/register', {
          method: 'POST',
          body: JSON.stringify(registerData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!registerResponse.ok) {
          throw new Error(`Register fetch error: ${registerResponse.status} ${registerResponse.statusText}`);
        }
  
        console.log('User registered, attempting sign in...');
        const registerResult = await registerResponse.json();
  
        const signInResult = await signIn('credentials', {
          email: email,
          password: password,
          redirect: false
        });
  
        if (signInResult?.error) {
          setError('Invalid email or password');
        } else if (signInResult?.ok) {
          console.log('Sign in successful, reloading page...');
          window.location.reload();
        } else {
          console.error('Sign in failed:', signInResult);
        }
      } else {
        // User Login.
        console.log('Logging in user...');
        const signInResult = await signIn('credentials', {
          email: email,
          password: password,
          redirect: false
        });
  
        if (signInResult?.error) {
          setError('Invalid email or password');
        } else if (signInResult?.ok) {
          console.log('Sign in successful, reloading page...');
          window.location.reload();
        } else {
          console.error('Sign in failed:', signInResult);
        }
      }
    } catch (error) {
      console.error('Error during complete:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // İşlem tamamlandığında veya hata oluştuğunda loading'i durdur
    }
  };

  const loginWithGoogle = async () => {
    
  }

  return (
    <div className="login-client-container">
      {process === 0 ? (
        <Button
          text="Login"
          onClick={login}
          paddingTop={21.2}
          paddingBottom={21.2}
          paddingLeft={60}
          paddingRight={60}
          backgroundColor='#FFFFFF'
          textColor='#242220'
          borderLine={1}
          borderColor='#E7E5E4'
          fontSize={19}
          fontWeight={600}
        />
      ) : (
        <div>
          {loginProcess === 0 ? (
            <div>
              {/* Diğer içerikler */}
              <div style={{ display: "flex" }}>
                <span className="header-text">Join the Job Market</span>
              </div>
              <div style={{ position: "relative", marginBottom: 24 }}>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon-login'>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.54 11.7614C22.54 10.9459 22.4668 10.1618 22.3309 9.40909H11.5V13.8575H17.6891C17.4225 15.295 16.6123 16.513 15.3943 17.3284V20.2139H19.1109C21.2855 18.2118 22.54 15.2636 22.54 11.7614Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 22.9998C14.605 22.9998 17.2081 21.9701 19.1109 20.2137L15.3943 17.3283C14.3645 18.0183 13.0472 18.426 11.5 18.426C8.50474 18.426 5.96951 16.403 5.06519 13.6848H1.22314V16.6644C3.11542 20.4228 7.00451 22.9998 11.5 22.9998Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06523 13.6851C4.83523 12.9951 4.70455 12.258 4.70455 11.5001C4.70455 10.7421 4.83523 10.0051 5.06523 9.31506V6.33551H1.22318C0.444318 7.88801 0 9.64437 0 11.5001C0 13.3557 0.444318 15.1121 1.22318 16.6646L5.06523 13.6851Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 4.57386C13.1884 4.57386 14.7043 5.15409 15.8961 6.29364L19.1945 2.99523C17.2029 1.13955 14.5997 0 11.5 0C7.00451 0 3.11542 2.57705 1.22314 6.33545L5.06519 9.315C5.96951 6.59682 8.50474 4.57386 11.5 4.57386Z" fill="black"/>
                </svg>
                <button className='google-button' onClick={loginWithGoogle}>Continue with Google</button>
              </div>
              <div style={{ position: "relative" }}>
                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon-login'>
                  <path d="M18.9673 17.924C18.6195 18.7275 18.2078 19.4672 17.7308 20.1472C17.0805 21.0743 16.5481 21.716 16.1378 22.0724C15.5018 22.6573 14.8204 22.9568 14.0906 22.9739C13.5667 22.9739 12.935 22.8248 12.1996 22.5224C11.4617 22.2214 10.7837 22.0724 10.1637 22.0724C9.51348 22.0724 8.81611 22.2214 8.0702 22.5224C7.32315 22.8248 6.72133 22.9824 6.2612 22.998C5.56143 23.0278 4.86393 22.7197 4.1677 22.0724C3.72333 21.6848 3.16751 21.0204 2.50167 20.0791C1.78727 19.0739 1.19994 17.9084 0.739811 16.5795C0.24703 15.1442 0 13.7543 0 12.4087C0 10.8673 0.333064 9.53789 1.00019 8.42385C1.52448 7.529 2.22199 6.82312 3.09497 6.30493C3.96795 5.78674 4.9112 5.52267 5.92701 5.50578C6.48282 5.50578 7.2117 5.6777 8.11748 6.01559C9.02069 6.35462 9.60065 6.52655 9.85492 6.52655C10.045 6.52655 10.6893 6.32552 11.7815 5.92473C12.8143 5.55305 13.686 5.39916 14.4001 5.45978C16.3352 5.61595 17.789 6.37876 18.7558 7.75303C17.0252 8.80163 16.1691 10.2703 16.1861 12.1544C16.2017 13.622 16.7341 14.8432 17.7804 15.8129C18.2546 16.2629 18.7842 16.6107 19.3734 16.8578C19.2456 17.2283 19.1107 17.5832 18.9673 17.924ZM14.5293 0.460131C14.5293 1.61039 14.1091 2.68439 13.2714 3.67847C12.2606 4.86023 11.038 5.54311 9.71209 5.43536C9.6952 5.29736 9.6854 5.15213 9.6854 4.99951C9.6854 3.89526 10.1661 2.71349 11.0198 1.74724C11.446 1.25801 11.988 0.851218 12.6454 0.526714C13.3013 0.207053 13.9217 0.0302728 14.5052 0C14.5222 0.153772 14.5293 0.307554 14.5293 0.460116V0.460131Z" fill="black"/>
                </svg>
                <button className='apple-button'>Continue with Apple</button>
              </div>
              <div style={{ display: "flex" }}>
                <a className="email-text" onClick={showInput}>Continue with Email</a>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="bottom-line"></div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="information">By continuing, you agree to the <span style={{ color: "#1D1C2B" }}>Terms of Service</span> and <span style={{ color: "#1D1C2B" }}>Privacy Policy</span>, including <span style={{ color: "#1D1C2B" }}>Cookie Use.</span></span>
              </div>
            </div>
          ) : (
            <div className="login-form-container">
              <div className="error-message-container">
                {error && <div className="error-message">{error}</div>}
              </div>
              <div style={{ display: "flex", width: "252px", marginBottom: "20px" }}>
                <Input 
                  id="email" 
                  placeholder="Email" 
                  type="email" 
                  required 
                  value={email} 
                  onChange={emailChange}
                  className={error ? 'error-input' : ''}
                />
              </div>
              <div style={{ display: "flex", width: "252px", marginBottom: "24px" }}>
                <Input 
                  id="password" 
                  placeholder="Password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={passwordChange}
                  className={error ? 'error-input' : ''}
                />
              </div>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div><input className="remember-input" id='remember' type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /></div>
                <div><span className="remember-span">Remember</span></div>
                <div><span className="recovery-span">Password Recovery</span></div>
              </div>
              <div>
                <Button
                  text="Continue"
                  onClick={complete}
                  paddingTop={15}
                  paddingBottom={15}
                  paddingLeft={92}
                  paddingRight={91}
                  fontSize={15}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginClient;
