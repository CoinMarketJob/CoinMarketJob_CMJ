"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./PasswordModal.module.css";

interface PasswordModalProps {
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <div>
      <div className={styles.MainDiv}>
        <div className={styles.Grid}>
          <div className={styles.Content}>
            <div className={styles.Full}>
              <span className={styles.Title}>CoinMarketJob</span>
              <p className={styles.ConnectMinds}>CONNECTING MINDS AND JOBS</p>
              <div className={styles.Description}>
                <div className={styles.DescriptionContent}>
                  <input
                    className={styles.Mail}
                    ref={emailRef}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <button onClick={handleSubmit} className={styles.button}>
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>© 2024 COINMARKETJOB</div>
    </div>
  );
};

export default PasswordModal;
