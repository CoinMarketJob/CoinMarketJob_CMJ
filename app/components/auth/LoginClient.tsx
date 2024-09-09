"use client";
import React, { useState, useEffect } from "react";
import Button from "../general/Button";
import Input from "../general/Input";
import Dropdown from "../general/Dropdown";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./LoginClient.css";
import Link from 'next/link';

const LoginClient = () => {
  const router = useRouter();
  const [process, setProcess] = useState(0);
  const [loginProcess, setLoginProcess] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+1");
  const [phone, setPhone] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userId, setUserId] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const countryCodes = [
    { value: "+0", label: "+0" },
    { value: "+1", label: "+1" },
    { value: "+2", label: "+2" },
    { value: "+3", label: "+3" },
    { value: "+4", label: "+4" },
    { value: "+5", label: "+5" },
    { value: "+6", label: "+6" },
    { value: "+7", label: "+7" },
    { value: "+8", label: "+8" },
    { value: "+9", label: "+9" },
    { value: "+10", label: "+10" },
    { value: "+11", label: "+11" },
    { value: "+12", label: "+12" },
    { value: "+13", label: "+13" },
    { value: "+14", label: "+14" },
    { value: "+15", label: "+15" },
    { value: "+16", label: "+16" },
    { value: "+17", label: "+17" },
    { value: "+18", label: "+18" },
    { value: "+19", label: "+19" },
    { value: "+20", label: "+20" },
    { value: "+21", label: "+21" },
    { value: "+22", label: "+22" },
    { value: "+23", label: "+23" },
    { value: "+24", label: "+24" },
    { value: "+25", label: "+25" },
    { value: "+26", label: "+26" },
    { value: "+27", label: "+27" },
    { value: "+28", label: "+28" },
    { value: "+29", label: "+29" },
    { value: "+30", label: "+30" },
    { value: "+31", label: "+31" },
    { value: "+32", label: "+32" },
    { value: "+33", label: "+33" },
    { value: "+34", label: "+34" },
    { value: "+35", label: "+35" },
    { value: "+36", label: "+36" },
    { value: "+37", label: "+37" },
    { value: "+38", label: "+38" },
    { value: "+39", label: "+39" },
    { value: "+40", label: "+40" },
    { value: "+41", label: "+41" },
    { value: "+42", label: "+42" },
    { value: "+43", label: "+43" },
    { value: "+44", label: "+44" },
    { value: "+45", label: "+45" },
    { value: "+46", label: "+46" },
    { value: "+47", label: "+47" },
    { value: "+48", label: "+48" },
    { value: "+49", label: "+49" },
    { value: "+50", label: "+50" },
    { value: "+51", label: "+51" },
    { value: "+52", label: "+52" },
    { value: "+53", label: "+53" },
    { value: "+54", label: "+54" },
    { value: "+55", label: "+55" },
    { value: "+56", label: "+56" },
    { value: "+57", label: "+57" },
    { value: "+58", label: "+58" },
    { value: "+59", label: "+59" },
    { value: "+60", label: "+60" },
    { value: "+61", label: "+61" },
    { value: "+62", label: "+62" },
    { value: "+63", label: "+63" },
    { value: "+64", label: "+64" },
    { value: "+65", label: "+65" },
    { value: "+66", label: "+66" },
    { value: "+67", label: "+67" },
    { value: "+68", label: "+68" },
    { value: "+69", label: "+69" },
    { value: "+70", label: "+70" },
    { value: "+71", label: "+71" },
    { value: "+72", label: "+72" },
    { value: "+73", label: "+73" },
    { value: "+74", label: "+74" },
    { value: "+75", label: "+75" },
    { value: "+76", label: "+76" },
    { value: "+77", label: "+77" },
    { value: "+78", label: "+78" },
    { value: "+79", label: "+79" },
    { value: "+80", label: "+80" },
    { value: "+81", label: "+81" },
    { value: "+82", label: "+82" },
    { value: "+83", label: "+83" },
    { value: "+84", label: "+84" },
    { value: "+85", label: "+85" },
    { value: "+86", label: "+86" },
    { value: "+87", label: "+87" },
    { value: "+88", label: "+88" },
    { value: "+89", label: "+89" },
    { value: "+90", label: "+90" },
    { value: "+91", label: "+91" },
    { value: "+92", label: "+92" },
    { value: "+93", label: "+93" },
    { value: "+94", label: "+94" },
    { value: "+95", label: "+95" },
    { value: "+96", label: "+96" },
    { value: "+97", label: "+97" },
    { value: "+98", label: "+98" },
    { value: "+99", label: "+99" },
    { value: "+100", label: "+100" },
    { value: "+101", label: "+101" },
    { value: "+102", label: "+102" },
    { value: "+103", label: "+103" },
    { value: "+104", label: "+104" },
    { value: "+105", label: "+105" },
    { value: "+106", label: "+106" },
    { value: "+107", label: "+107" },
    { value: "+108", label: "+108" },
    { value: "+109", label: "+109" },
    { value: "+110", label: "+110" },
    { value: "+111", label: "+111" },
    { value: "+112", label: "+112" },
    { value: "+113", label: "+113" },
    { value: "+114", label: "+114" },
    { value: "+115", label: "+115" },
    { value: "+116", label: "+116" },
    { value: "+117", label: "+117" },
    { value: "+118", label: "+118" },
    { value: "+119", label: "+119" },
    { value: "+120", label: "+120" },
    { value: "+121", label: "+121" },
    { value: "+122", label: "+122" },
    { value: "+123", label: "+123" },
    { value: "+124", label: "+124" },
    { value: "+125", label: "+125" },
    { value: "+126", label: "+126" },
    { value: "+127", label: "+127" },
    { value: "+128", label: "+128" },
    { value: "+129", label: "+129" },
    { value: "+130", label: "+130" },
    { value: "+131", label: "+131" },
    { value: "+132", label: "+132" },
    { value: "+133", label: "+133" },
    { value: "+134", label: "+134" },
    { value: "+135", label: "+135" },
    { value: "+136", label: "+136" },
    { value: "+137", label: "+137" },
    { value: "+138", label: "+138" },
    { value: "+139", label: "+139" },
    { value: "+140", label: "+140" },
    { value: "+141", label: "+141" },
    { value: "+142", label: "+142" },
    { value: "+143", label: "+143" },
    { value: "+144", label: "+144" },
    { value: "+145", label: "+145" },
    { value: "+146", label: "+146" },
    { value: "+147", label: "+147" },
    { value: "+148", label: "+148" },
    { value: "+149", label: "+149" },
    { value: "+150", label: "+150" },
    { value: "+151", label: "+151" },
    { value: "+152", label: "+152" },
    { value: "+153", label: "+153" },
    { value: "+154", label: "+154" },
  ];

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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const complete = async () => {
    setError(null);
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const submitData = { email };
    console.log("Submitting data:", submitData);

    try {
      const response = await fetch("/api/user/get", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Fetch error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (data == null) {
        // User register.
        const registerData = { email, password };
        console.log("Registering user:", registerData);

        const registerResponse = await fetch("/api/user/register", {
          method: "POST",
          body: JSON.stringify(registerData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!registerResponse.ok) {
          throw new Error(
            `Register fetch error: ${registerResponse.status} ${registerResponse.statusText}`
          );
        }

        console.log("User registered, attempting sign in...");
        const registerResult = await registerResponse.json();

        console.log("Register result:", registerResult);

        setUserId(registerResult.id);

        setIsPopupOpen(true);
      } else {
        // User Login.
        console.log("Logging in user...");
        const signInResult = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });

        if (signInResult?.error) {
          setError("Invalid email or password");
        } else if (signInResult?.ok) {
          console.log("Sign in successful, reloading page...");
          window.location.reload();
        } else {
          console.error("Sign in failed:", signInResult);
        }
      }
    } catch (error) {
      console.error("Error during complete:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {};

  const ContinueWithProfile = async () => {

    if(name == "" || surname == "" || phone == ""){
      setRegisterError("You must fill all field.");
      return;
    } 

    const profileData = {
      userId,
      name,
      surname,
      phoneCode,
      phoneNumber: phone,
    };

    const registerResponse = await fetch("/api/profile/firstRegister", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!registerResponse.ok) {
      throw new Error(
        `Register fetch error: ${registerResponse.status} ${registerResponse.statusText}`
      );
    }

    const signInResult = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (signInResult?.error) {
      setError("Invalid email or password");
    } else if (signInResult?.ok) {
      console.log("Sign in successful, reloading page...");
      setIsPopupOpen(false);
    } else {
      console.error("Sign in failed:", signInResult);
    }
  };

  return (
    <div className="login-client-container">
      {process === 0 ? (
        <Button
          text="Enter"
          disabled={true}
          onClick={login}
          paddingTop={21.2}
          paddingBottom={21.2}
          paddingLeft={60}
          paddingRight={60}
          backgroundColor="#FFFFFF"
          textColor="#242220"
          borderLine={1}
          borderColor="#E7E5E4"
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
              <div style={{ position: "relative", marginBottom: 24, width: '100%', maxWidth: '300px' }}>
                <button className="google-button" onClick={loginWithGoogle}>
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon-login"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.54 11.7614C22.54 10.9459 22.4668 10.1618 22.3309 9.40909H11.5V13.8575H17.6891C17.4225 15.295 16.6123 16.513 15.3943 17.3284V20.2139H19.1109C21.2855 18.2118 22.54 15.2636 22.54 11.7614Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 22.9998C14.605 22.9998 17.2081 21.9701 19.1109 20.2137L15.3943 17.3283C14.3645 18.0183 13.0472 18.426 11.5 18.426C8.50474 18.426 5.96951 16.403 5.06519 13.6848H1.22314V16.6644C3.11542 20.4228 7.00451 22.9998 11.5 22.9998Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.06523 13.6851C4.83523 12.9951 4.70455 12.258 4.70455 11.5001C4.70455 10.7421 4.83523 10.0051 5.06523 9.31506V6.33551H1.22318C0.444318 7.88801 0 9.64437 0 11.5001C0 13.3557 0.444318 15.1121 1.22318 16.6646L5.06523 13.6851Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 4.57386C13.1884 4.57386 14.7043 5.15409 15.8961 6.29364L19.1945 2.99523C17.2029 1.13955 14.5997 0 11.5 0C7.00451 0 3.11542 2.57705 1.22314 6.33545L5.06519 9.315C5.96951 6.59682 8.50474 4.57386 11.5 4.57386Z"
                      fill="black"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
              <div style={{ position: "relative", width: '100%', maxWidth: '300px' }}>
                <button className="apple-button">
                  <svg
                    width="20"
                    height="23"
                    viewBox="0 0 20 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon-login"
                  >
                    <path
                      d="M18.9673 17.924C18.6195 18.7275 18.2078 19.4672 17.7308 20.1472C17.0805 21.0743 16.5481 21.716 16.1378 22.0724C15.5018 22.6573 14.8204 22.9568 14.0906 22.9739C13.5667 22.9739 12.935 22.8248 12.1996 22.5224C11.4617 22.2214 10.7837 22.0724 10.1637 22.0724C9.51348 22.0724 8.81611 22.2214 8.0702 22.5224C7.32315 22.8248 6.72133 22.9824 6.2612 22.998C5.56143 23.0278 4.86393 22.7197 4.1677 22.0724C3.72333 21.6848 3.16751 21.0204 2.50167 20.0791C1.78727 19.0739 1.19994 17.9084 0.739811 16.5795C0.24703 15.1442 0 13.7543 0 12.4087C0 10.8673 0.333064 9.53789 1.00019 8.42385C1.52448 7.529 2.22199 6.82312 3.09497 6.30493C3.96795 5.78674 4.9112 5.52267 5.92701 5.50578C6.48282 5.50578 7.2117 5.6777 8.11748 6.01559C9.02069 6.35462 9.60065 6.52655 9.85492 6.52655C10.045 6.52655 10.6893 6.32552 11.7815 5.92473C12.8143 5.55305 13.686 5.39916 14.4001 5.45978C16.3352 5.61595 17.789 6.37876 18.7558 7.75303C17.0252 8.80163 16.1691 10.2703 16.1861 12.1544C16.2017 13.622 16.7341 14.8432 17.7804 15.8129C18.2546 16.2629 18.7842 16.6107 19.3734 16.8578C19.2456 17.2283 19.1107 17.5832 18.9673 17.924ZM14.5293 0.460131C14.5293 1.61039 14.1091 2.68439 13.2714 3.67847C12.2606 4.86023 11.038 5.54311 9.71209 5.43536C9.6952 5.29736 9.6854 5.15213 9.6854 4.99951C9.6854 3.89526 10.1661 2.71349 11.0198 1.74724C11.446 1.25801 11.988 0.851218 12.6454 0.526714C13.3013 0.207053 13.9217 0.0302728 14.5052 0C14.5222 0.153772 14.5293 0.307554 14.5293 0.460116V0.460131Z"
                      fill="black"
                    />
                  </svg>
                  Continue with Apple
                </button>
              </div>
              <div style={{ display: "flex" }}>
                <a className="email-text" onClick={showInput}>
                  Continue with Email
                </a>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="bottom-line"></div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="information">
                  By continuing, you agree to the{" "}
                  <Link href="https://beta.coinmarketjob.com/tos" className="policy-link" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="https://beta.coinmarketjob.com/privacy" className="policy-link" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                  , including{" "}
                  <Link href="https://beta.coinmarketjob.com/cookies" className="policy-link" target="_blank" rel="noopener noreferrer">
                    Cookie Use
                  </Link>
                  .
                </span>
              </div>
            </div>
          ) : (
            <div className="login-form-container">
              <div className="error-message-container">
                {error && <div className="error-message">{error}</div>}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "252px",
                  marginBottom: "20px",
                }}
              >
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={email}
                  onChange={emailChange}
                  className={error ? "error-input" : ""}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "252px",
                  marginBottom: "24px",
                }}
              >
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  required
                  value={password}
                  onChange={passwordChange}
                  className={error ? "error-input" : ""}
                />
              </div>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div>
                  <input
                    className="remember-input"
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                </div>
                <div>
                  <span className="remember-span">Remember</span>
                </div>
                <div>
                  <span className="recovery-span">Password recovery</span>
                </div>
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

      <div
        className="register-popup"
        style={{ display: !isPopupOpen ? "none" : "flex" }}
      >
        <div className="error-message-container">
          {registerError && <div className="error-message">{registerError}</div>}
        </div>
        <div className="register-popup-line">
          <Input
            id="name"
            placeholder="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={registerError ? "error-input" : ""}
          />
          <Input
            id="surname"
            placeholder="Surname"
            type="text"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={registerError ? "error-input" : ""}
          />
        </div>
        <div className="register-popup-line">
          <div style={{ width: "95px" }}>
            <Dropdown
              id="phoneCode"
              list={countryCodes}
              placeholder="Phone Code"
              value={phoneCode}
              setValue={setPhoneCode}
              error={registerError ? true: false}
            />
          </div>
          <div style={{ width: "193px" }}>
            <Input
              id="phone"
              placeholder="Phone"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={registerError ? "error-input" : ""}
            />
          </div>
        </div>
        <div className="register-popup-line">
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              onClick={() => ContinueWithProfile()}
              paddingTop={15}
              paddingBottom={15}
              paddingLeft={117}
              paddingRight={117}
              fontSize={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
