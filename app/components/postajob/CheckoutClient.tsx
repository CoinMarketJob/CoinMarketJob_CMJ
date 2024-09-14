import React, { useState, useRef } from "react";
import styles from "./CheckoutClient.module.css";
import PaymentCheckbox from "./PaymentCheckbox";
import Button from "../general/Button";
import { useRouter } from "next/navigation";
import CreditCard, { CreditCardRef } from "./CreditCard";
import PostaJobPopup from "./PostaJobPopup";
import BillingAddress from "./BillingAddress";
import BillingEmail from "./BillingEmail";
import Input from "../general/Input"; // Add this import

interface CheckoutProps {
  oneJobIsChecked: boolean;
  setOneJobIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  monthlyChecked: boolean;
  setMonthlyChecked: React.Dispatch<React.SetStateAction<boolean>>;
  fiveJobChecked: boolean;
  setFiveJobChecked: React.Dispatch<React.SetStateAction<boolean>>;
  Complete: () => void;
  uploading: boolean;
}

const CheckoutClient: React.FC<CheckoutProps> = ({
  oneJobIsChecked,
  setOneJobIsChecked,
  monthlyChecked,
  setMonthlyChecked,
  fiveJobChecked,
  setFiveJobChecked,
  Complete,
  uploading
}) => {
  const [creditCard, setCreditCard] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);
  const [billingEmail, setBillingEmail] = useState<boolean>(false);
  const [savedCardNumber, setSavedCardNumber] = useState<string>("");
  const [savedCardType, setSavedCardType] = useState<string>("");

  const creditCardRef = useRef<CreditCardRef>(null);

  const CreditCardSave = () => {
    if (creditCardRef.current) {
      const isValid = creditCardRef.current.handleSave();
      if (isValid) {
        setCreditCard(false);
      }
    }
  };

  const AddressSave = () => {
    console.log("Address saved");
    // Implement address saving logic here
  };

  const handleCreditCardClick = () => {
    setCreditCard(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.CheckoutText}>Checkout</div>
      <div className={styles.Line}></div>
      <div className={styles.Selection}>
        <PaymentCheckbox
          oneJobIsChecked={oneJobIsChecked}
          setOneJobIsChecked={setOneJobIsChecked}
          monthlyChecked={monthlyChecked}
          setMonthlyChecked={setMonthlyChecked}
          fiveJobChecked={fiveJobChecked}
          setFiveJobChecked={setFiveJobChecked}
        />
      </div>

      <div className={styles.PaymentText}>Payment Method</div>

      <div className={styles.CreditCardGroup}>
        <div className={styles.FirstCol}>Credit Card</div>
        <div>
          <PostaJobPopup
            open={creditCard}
            setOpen={setCreditCard}
            Save={CreditCardSave}
          >
            <CreditCard 
              ref={creditCardRef} 
              onSave={(number, type) => {
                setSavedCardNumber(number);
                setSavedCardType(type);
              }} 
            />
          </PostaJobPopup>
        </div>
        <div className={styles.AddCol}>
          <span onClick={handleCreditCardClick}>
            {savedCardNumber 
              ? `${savedCardType} **** **** **** ${savedCardNumber.slice(-4)}`
              : "Add Credit Card"
            }
          </span>
        </div>
      </div>
      <div className={styles.Line}></div>

      <div className={styles.AddressGroup}>
        <div className={styles.FirstCol}>Billing Address</div>

        <div>
          <PostaJobPopup open={address} setOpen={setAddress} Save={AddressSave}>
            <BillingAddress />
          </PostaJobPopup>
        </div>

        <div className={styles.AddCol}>
          <span onClick={() => setAddress(!address)}>Add Adress</span>
        </div>
      </div>
      <div className={styles.Line}></div>

      <div className={styles.MailGroup}>
        <div className={styles.FirstCol}>Billing Email</div>

        <div>
          <PostaJobPopup
            open={billingEmail}
            setOpen={setBillingEmail}
            Save={AddressSave}
          >
            <BillingEmail />
          </PostaJobPopup>
        </div>

        <div
          className={styles.AddCol}
        >
          <span onClick={() => setBillingEmail(!address)}>email@you.com</span>
        </div>
      </div>
      <div className={styles.Line}></div>

      <div className={`${styles.Continue}`}>
        <Button
          onClick={Complete}
          text="Complete Purchase"
          paddingTop={16}
          paddingBottom={16}
          paddingLeft={19}
          paddingRight={19}
          fontSize={15}
          isLoading={uploading}
        />
      </div>
    </div>
  );
};

export default CheckoutClient;
