"use client";
import React from "react";
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
        setOneJobIsChecked(!oneJobIsChecked);
        return;
      case 1:
        setMonthlyChecked(!monthlyChecked);
        return;
      case 2:
        setFiveJobChecked(!fiveJobChecked);
        return;
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    if (oneJobIsChecked) subtotal += 25;
    if (monthlyChecked) subtotal += 150;
    if (fiveJobChecked) subtotal += 100;
    return subtotal;
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.05; // %5 vergi
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <div>
      <div style={{ display: "flex", marginTop: 26, width: "100%", alignItems: "center" }}>
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
        <div className={oneJobIsChecked ? styles.TextSelect : styles.Text}>1 Job Posting</div>
        <div className={oneJobIsChecked ? styles.PriceSelect : styles.Price}>$25</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%", alignItems: "center" }}>
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
        <div className={monthlyChecked ? styles.TextSelect : styles.Text}>Monthly Subscription</div>
        <div className={monthlyChecked ? styles.PriceSelect : styles.Price}>$150</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%", alignItems: "center" }}>
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
        <div className={fiveJobChecked ? styles.TextSelect : styles.Text}>5 Job Posting Bundle</div>
        <div className={fiveJobChecked ? styles.PriceSelect : styles.Price}>$100</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%"}}>
        <div className={styles.Text} style={{ marginLeft: 35 }}>
          Subtotal
        </div>
        <div className={styles.Price}>${subtotal.toFixed(2)}</div>
      </div>

      <div style={{ display: "flex", marginTop: 26, width: "100%" }}>
        <div className={styles.Text} style={{ marginLeft: 35 }}>
          Estimated tax
        </div>
        <div className={styles.Price}>${tax.toFixed(2)}</div>
      </div>

      <div className={styles.Line}></div>

      <div style={{ display: "flex", marginTop: 13, width: "100%" }}>
        <div className={styles.Total}>Total ${total.toFixed(2)} USD</div>
      </div>
    </div>
  );
};

export default PaymentCheckbox;
