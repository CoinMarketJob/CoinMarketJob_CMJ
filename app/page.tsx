'use client'
import styles from "./page.module.css";
import React, { useEffect, useState, useRef } from "react";

export default function Home() {

  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      console.log(response);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.zip');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      else {
        if (response.status === 401) {
          alert('Incorrect Password.');
        }
        else {
          alert('An unexpected error occurred');
        }
      }

    } catch (error) {
      alert('The file could not be downloaded. Please try again.');
    }
  }

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [])

  return (
    <main className={styles.main}>
      <input ref={passwordRef} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.password} placeholder="Password" />
      <button onClick={handleDownload} className={styles.button}>Download the files</button>
    </main>
  );
}
