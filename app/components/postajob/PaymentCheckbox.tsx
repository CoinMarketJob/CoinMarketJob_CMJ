"use client";
import React, { useState } from "react";
import styles from "./PaymentCheckbox.module.css";

interface CheckboxProps {
  oneJobIsChecked: boolean;
  setOneJobIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  monthlyChecked: boolean;
  setMonthlyChecked: React.Dispatch<React.SetStateAction<boolean>>;
  fiveJobChecked: boolean;
  setFiveJobChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentCheckbox: React.FC<CheckboxProps> = ({
  oneJobIsChecked,
  setOneJobIsChecked,
  monthlyChecked,
  setMonthlyChecked,
  fiveJobChecked,
  setFiveJobChecked,
}) => {
  const toggleCheckbox = (checkBox: number) => {
    switch (checkBox) {
      case 0:
        setOneJobIsChecked(true);
        setMonthlyChecked(false);
        setFiveJobChecked(false);
        return;
      case 1:
        setOneJobIsChecked(false);
        setMonthlyChecked(true);
        setFiveJobChecked(false);
        return;
      case 2:
        setOneJobIsChecked(false);
        setMonthlyChecked(false);
        setFiveJobChecked(true);
        return;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: 26, width: "100%" }}>
        <div
          className={`${styles.checkboxIcon} ${
            oneJobIsChecked ? styles.checked : ""
          }`}
          onClick={() => toggleCheckbox(0)}
        >
          <div className={styles.checkmark}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8876 0L14.7101 1.82248L10.1213 6.41124L5.53254 11L0 5.46746L1.82249 3.64497L5.53254 7.35503L9.21006 3.67751L12.8876 0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.TextSelect}>1 Job Posting</div>
        <div className={styles.PriceSelect}>$15</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%" }}>
        <div
          className={`${styles.checkboxIcon} ${
            monthlyChecked ? styles.checked : ""
          }`}
          onClick={() => toggleCheckbox(1)}
        >
          <div className={styles.checkmark}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8876 0L14.7101 1.82248L10.1213 6.41124L5.53254 11L0 5.46746L1.82249 3.64497L5.53254 7.35503L9.21006 3.67751L12.8876 0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.Text}>Monthly Subscription (150$)</div>
        <div className={styles.Price}>$0</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%" }}>
        <div
          className={`${styles.checkboxIcon} ${
            fiveJobChecked ? styles.checked : ""
          }`}
          onClick={() => toggleCheckbox(2)}
        >
          <div className={styles.checkmark}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8876 0L14.7101 1.82248L10.1213 6.41124L5.53254 11L0 5.46746L1.82249 3.64497L5.53254 7.35503L9.21006 3.67751L12.8876 0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.Text}>5 Job Posting Bundle (100$)</div>
        <div className={styles.Price}>$0</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%" }}>
        <div className={styles.Text} style={{ marginLeft: 35 }}>
          % Taxes (estimated)
        </div>
        <div className={styles.Price}>$0</div>
      </div>

      <div className={styles.Line}></div>

      <div style={{ display: "flex", marginTop: 13, width: "100%" }}>
        <div className={styles.Total}>Total $15 USD</div>
      </div>
    </div>
  );
};

export default PaymentCheckbox;
