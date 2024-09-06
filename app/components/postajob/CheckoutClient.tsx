import React, { useState } from "react";
import styles from "./CheckoutClient.module.css";
import PaymentCheckbox from "./PaymentCheckbox";
import Button from "../general/Button";
import { useRouter } from "next/navigation";
import CreditCard from "./CreditCard";
import PostaJobPopup from "./PostaJobPopup";
import BillingAddress from "./BillingAddress";
import BillingEmail from "./BillingEmail";

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


  const CreditCardSave = () => {
    console.log("Save Credit Card");
  };

  const AddressSave = () => {
    console.log("Save Address");
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
            <CreditCard />
          </PostaJobPopup>
        </div>
        <div
          onClick={() => setCreditCard(!creditCard)}
          className={styles.AddCol}
        >
          Add Credit Card
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

        <div onClick={() => setAddress(!address)} className={styles.AddCol}>
          Add Adress
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
          onClick={() => setBillingEmail(!address)}
          className={styles.AddCol}
        >
          email@you.com
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
