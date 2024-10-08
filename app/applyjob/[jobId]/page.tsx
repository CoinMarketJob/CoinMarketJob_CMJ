/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./applyjob.module.css";
import Input from "@/app/components/general/Input";
import Dropdown from "@/app/components/general/Dropdown";
import Draft from "@/app/components/general/Draft";
import InputFile from "@/app/components/general/InputFile";
import Button from "@/app/components/general/Button";
import { JSONContent } from "@tiptap/react";
import LocationSelector from "@/app/components/location/LocationSelector";
import Checkbox from "@/app/components/general/Checkbox";
import QuestionDraft from "@/app/components/general/QuestionDraft";
import { JobQuestions } from "@prisma/client";
import { useRouter } from "next/navigation"; // Add this import
import Icon from "@/app/components/general/Icon";

type JobProps = {
  jobId: string;
};

const PagePlaceholder = () => (
  <div className={styles.placeholderContainer}>
    <div className={styles.placeholderContent}>
      <div className={styles.placeholderHeader}>
        <div className={styles.placeholderLogo}></div>
        <div className={styles.placeholderTitle}></div>
      </div>
      <div className={styles.placeholderLine}></div>
      <div className={styles.placeholderForm}>
        <div className={styles.placeholderInput}></div>
        <div className={styles.placeholderInput}></div>
        <div className={styles.placeholderInput}></div>
      </div>
    </div>
  </div>
);

const page = ({ params }: { params: JobProps }) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+0");
  const [phone, setPhone] = useState<string>("");

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [letterFile, setLetterFile] = useState<File | null>(null);

  const [cvManualState, setCvManualState] = useState<boolean>(false);
  const [letterManualState, setLetterManualState] = useState<boolean>(false);

  const [cv, setCv] = useState<JSONContent>();
  const [coverLetter, setCoverLetter] = useState<JSONContent>();

  const [jobName, setJobName] = useState<string>("");
  const [jobLogo, setJobLogo] = useState<string>("");

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelWidth, setPanelWidth] = useState<number>(0); //for resizeability
  const [visaSelected, setVisaSelected] = useState<boolean>(false);
  const [jobQuestions, setJobQuestions] = useState<JobQuestions[]>([]);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const [isFormValid, setIsFormValid] = useState(false);

  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleResize = () => {
    if (panelRef.current) {
      setPanelWidth(panelRef.current.offsetWidth);
    }
  };

  const { jobId } = params;

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => handleResize());

    if (panelRef.current) {
      resizeObserver.observe(panelRef.current);
      handleResize(); // Initial call to set the size
    }
    return () => {
      if (panelRef.current) {
        resizeObserver.unobserve(panelRef.current);
      }
    };
  }, []);

  const calculateFontSize = (baseSize: number, scaleFactor: number) => {
    return Math.min(baseSize + panelWidth * scaleFactor, 35);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsPageLoading(true);
        const response = await fetch("/api/job/get/" + jobId);
        const data = await response.json();
        setJobName(data.jobTitle);
        setJobLogo(data.logo);
        setJobQuestions(data.jobQuestions);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsPageLoading(false);
      }
    }

    fetchData();
  }, [jobId]);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const surnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const cvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFile(e.target.files ? e.target.files[0] : null);
  };

  const letterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLetterFile(e.target.files ? e.target.files[0] : null);
  };

  const cvDraftChange = (content: JSONContent) => {
    setCv(content);
  };

  const coverLetterDraftChange = (content: JSONContent) => {
    setCoverLetter(content);
  };

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

  const submit = async () => {
    setUploading(true);
    setIsFormValid(true);
    var resumeLink = "";
    var letterLink = "";
    try {
      // Upload cover letter
      const uploadLetterPromise = async () => {
        if (!letterManualState && letterFile) {
          const formData = new FormData();
          formData.append("file", letterFile);
          formData.append("Content-Type", letterFile.type);

          const response = await fetch("/api/appliedJob/documents/", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            letterLink = data.url;
          } else {
            console.error("Error uploading cover letter:", response.statusText);
          }
        }
      };

      // Upload CV
      const uploadCvPromise = async () => {
        if (!cvManualState && cvFile) {
          const formData = new FormData();
          formData.append("file", cvFile);
          formData.append("Content-Type", cvFile.type);

          const response = await fetch("/api/appliedJob/documents/", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            resumeLink = data.url;
          } else {
            console.error("Error uploading CV:", response.statusText);
          }
        }
      };

      // Wait for both uploads to complete
      await Promise.all([uploadLetterPromise(), uploadCvPromise()]);

      // Proceed with submitting job data
      const jobData = {
        jobId,
        name,
        surname,
        email,
        phoneCode: countryCode,
        phone,
        resumeDraft: cvManualState ? cv : null,
        coverLetterDraft: letterManualState ? coverLetter : null,
        resumeLink: !cvManualState ? resumeLink : null,
        coverLetterLink: !letterManualState ? letterLink : null,
        visaSponsorship: visaSelected,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        })),
      };

      const response = await fetch("/api/appliedJob/", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(jobData);
        setSuccessMessage("Your application has been submitted successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
          router.push("/");
        }, 3000);
      } else {
        console.error("Error applying for job:", response.statusText);
        setErrorMessage(
          "An unexpected error has occurred. Please try again later."
        );
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error in submission process:", error);
      setErrorMessage("An error occurred while submitting your application.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setUploading(false);
    }
  };

  const VisaHandleChange: (selectedValue: boolean) => void = (
    selectedValue
  ) => {
    console.log("Selected value:", selectedValue);
  };

  const validateForm = () => {
    setIsFormValid(true);
  };
  useEffect(() => {
    validateForm();
  }, [jobId, name, surname, email, phone, cvFile, letterFile, cv, coverLetter]);

  const ArrowIcon = () => {
    return (
      <svg
        width="16"
        height="29"
        viewBox="0 0 16 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.29487 14.4688L14.8961 27.0707C15.1398 27.3144 15.2709 27.5515 15.2894 27.7819C15.3074 28.0127 15.177 28.2704 14.8983 28.5549C14.619 28.8393 14.3718 28.9875 14.1565 28.9993C13.9418 29.0112 13.6749 28.8668 13.3558 28.5662L0.60167 15.8114C0.424835 15.5976 0.280236 15.3838 0.167877 15.17C0.0559922 14.9561 5.15829e-05 14.7177 5.15829e-05 14.4546C5.15829e-05 14.1914 0.0564681 13.952 0.169301 13.7363C0.282134 13.5211 0.42768 13.3241 0.605936 13.1454L13.3515 0.403309C13.6369 0.117909 13.8844 -0.0160195 14.094 0.00152051C14.3035 0.0185894 14.5479 0.16935 14.8271 0.453803C15.1059 0.738255 15.2453 0.986676 15.2453 1.19907C15.2453 1.41146 15.1052 1.65775 14.825 1.93793L2.29487 14.4688Z"
          fill="#242220"
          fillOpacity="0.4"
        />
      </svg>
    );
  };
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div ref={panelRef} className={styles.ContainerCard}>
      {isPageLoading ? (
        <PagePlaceholder />
      ) : (
        <>
          {errorMessage && (
            <div className={styles.ErrorMessage}>{errorMessage}</div>
          )}
          {successMessage && (
            <div className={styles.SuccessMessage}>{successMessage}</div>
          )}
          <div className={styles.ApplyCard}>
            <div style={{ display: "flex" }}>
              <div className={styles.arrowContainer}>
                <Icon
                  onClick={handleBackClick}
                  hoverSize={45}
                  hoverContent="Back"
                  tooltipPosition="bottom"
                >
                  <ArrowIcon />
                </Icon>
              </div>

              <div className={styles.ApplyText}>Apply</div>
              <div>
                <img src={jobLogo} className={styles.Logo} alt="Job Logo" />
              </div>
              <div className={styles.TitleText}>{jobName}</div>
            </div>
            <div className={styles.Line}></div>
            <div className={styles.doubleRow}>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                required
                value={name}
                onChange={nameChange}
              />
              <div style={{ width: "2.25rem" }}></div>
              <Input
                id="surname"
                placeholder="Surname"
                type="text"
                required
                value={surname}
                onChange={surnameChange}
              />
            </div>
            <div className={styles.singleRow}>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={emailChange}
              />
            </div>

            <div className={styles.doubleRow}>
              <div style={{ width: "7.5rem" }}>
                <Dropdown
                  id="countryCode"
                  value={countryCode}
                  setValue={setCountryCode}
                  list={countryCodes}
                />
              </div>
              <div style={{ width: "2.25rem" }}></div>

              <Input
                id="phone"
                placeholder="Phone"
                type="phone"
                required={false}
                value={phone}
                onChange={phoneChange}
              />
            </div>
            <div className={styles.jobQuestions}>
              {jobQuestions != null ? (
                jobQuestions.length > 0 ? (
                  jobQuestions.map((question, index) => (
                    <QuestionDraft
                      key={question.id}
                      question={question}
                      onAnswerChange={handleAnswerChange}
                    />
                  ))
                ) : (
                  <p></p>
                )
              ) : (
                <p></p>
              )}
            </div>

            {cvManualState == false && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  maxWidth: "479px",
                }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <InputFile
                    id="cv"
                    placeholder="Attach Resume / CV"
                    required
                    onChange={cvFileChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              text="Submit"
              fontSize={15}
              fontWeight={500}
              paddingLeft={60}
              paddingRight={59}
              paddingTop={15}
              paddingBottom={15}
              onClick={submit}
              disabled={!isFormValid}
              isLoading={uploading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default page;
