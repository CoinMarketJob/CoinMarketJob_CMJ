"use client";
import React, { useState } from 'react';
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
    const submitData = { email };

    try {
      const response = await fetch('/api/user/get', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      alert(data);

      if (data == null) {
        // User register.
        try {
          const registerData = { email, password };
          const response = await fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            signIn('credentials', {
              email: email,
              password: password,
              redirect: false
            }).then((callback) => {
              if (callback?.ok) {
                window.location.reload();
              }
            });
          } else {
            console.log("Failed");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // User Login.
        console.log("Login");
        signIn('credentials', {
          email: email,
          password: password,
          redirect: false
        }).then((callback) => {
          console.log(callback);
          if (callback?.ok) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {process === 0 ? (
        <Button
          text="Login"
          onClick={login}
          paddingTop={19}
          paddingBottom={19}
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
                  {/* SVG İçeriği */}
                </svg>
                <button className='google-button'>Continue with Google</button>
              </div>
              <div style={{ position: "relative" }}>
                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon-login'>
                  {/* SVG İçeriği */}
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
            <div>
              <div style={{ display: "flex", width: "252px", marginBottom: "20px" }}>
                <Input id="email" placeholder="Email" type="email" required value={email} onChange={emailChange} />
              </div>
              <div style={{ display: "flex", width: "252px", marginBottom: "24px" }}>
                <Input id="password" placeholder="Password" type="password" required value={password} onChange={passwordChange} />
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
