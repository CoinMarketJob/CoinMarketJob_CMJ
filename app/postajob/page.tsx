/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import EditClient from "../components/postajob/EditClient";
import { JSONContent } from "@tiptap/react";
import ReviewClient from "../components/postajob/ReviewClient";
import CheckoutClient from "../components/postajob/CheckoutClient";
import { useRouter } from "next/navigation";
import { useProfileData } from "@/hooks/useProfileData";
import Icon from "@/app/components/general/Icon";
import { uploadFile } from "@/utils/s3Operations"; // S3 yükleme fonksiyonunu import edin
import NextImage from "next/image"; // Next.js Image bileşenini yeniden adlandırıyoruz

const Page = () => {
  const [page, setPage] = useState<number>(0);

  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [jobType, setJobType] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [educationalDegree, setEducationalDegree] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [single, setSingle] = useState<string>("");
  const [visa, setVisa] = useState<boolean | undefined>(false);
  const [showSalary, setShowSalary] = useState<boolean>(false);
  const [unitSalary, setUnitSalary] = useState<string>("Year");
  const [questions, setQuestions] = useState<string[]>([]);
  const [description, setDescription] = useState<JSONContent>(JSON);

  const [jobTitle, setJobTitle] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("Remote");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [oneJobIsChecked, setOneJobIsChecked] = useState<boolean>(true);
  const [monthlyChecked, setMonthlyChecked] = useState<boolean>(false);
  const [fiveJobChecked, setFiveJobChecked] = useState<boolean>(false);

  const { companyProfileData, setCompanyProfileData } = useProfileData();
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultLogoPath = "/upload.png"; // Varsayılan logo yolu
  const [logoURL, setLogoURL] = useState<string>(defaultLogoPath);

  const generateDefaultLogo = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new window.Image(); // window.Image kullanarak yerleşik Image constructor'ını belirtiyoruz
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(new Blob());
            }
          }, "image/png");
        } else {
          resolve(new Blob());
        }
      };
      img.onerror = () => {
        resolve(new Blob());
      };
      img.src = defaultLogoPath;
    });
  };

  useEffect(() => {
    const initDefaultLogo = async () => {
      const defaultLogoBlob = await generateDefaultLogo();
      await uploadLogo(defaultLogoBlob, "default-logo.png");
    };

    initDefaultLogo();
  }, []); // Sadece bir kez çalışacak

  const uploadLogo = useCallback(
    async (file: File | Blob, fileName: string) => {
      const formData = new FormData();
      formData.append("file", file, fileName);
      formData.append(
        "Content-Type",
        file instanceof File ? file.type : "image/png"
      );

      try {
        const response = await fetch("/api/profileimage/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setLogoURL(data.url);
        } else {
          throw new Error("Logo upload failed");
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
        setErrorMessage("Failed to upload logo. Please try again.");
      }
    },
    []
  ); // Boş dependency array

  useEffect(() => {
    const handleLogoUpload = async () => {
      if (selectedImage) {
        await uploadLogo(selectedImage, selectedImage.name);
      } else if (companyName) {
        const logoBlob = await generateLogoFromCompanyName(companyName);
        await uploadLogo(logoBlob, "company-logo.png");
      }
    };

    handleLogoUpload();
  }, [selectedImage, companyName, uploadLogo]);

  const generateLogoFromCompanyName = (companyName: string): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Logo arka planı - siyah olarak değiştirildi
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 200, 200);

        // Şirket adının baş harfleri
        const initials = companyName
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        // Yazı rengini beyaz olarak değiştirdik
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 80px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, 100, 100);

        // Canvas'ı blob'a çevir
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            // Eğer blob oluşturulamazsa, boş bir blob döndür
            resolve(new Blob());
          }
        }, "image/png");
      } else {
        // Canvas context oluşturulamazsa, boş bir blob döndür
        resolve(new Blob());
      }
    });
  };

  const Complete = async () => {
    setUploading(true);
    try {
      const jobData = {
        PackageType: oneJobIsChecked
          ? "OneJob"
          : monthlyChecked
          ? "Monthly"
          : "FiveJob",
        logo: logoURL,
        companyName: companyName,
        jobTitle,
        location: selectedLocations[0],
        jobType: jobType || null,
        experienceLevel: experienceLevel || null,
        educationalDegree: educationalDegree || null,
        visaSponsorship: visa,
        salaryMin: min,
        salaryMax: max,
        jobDescription: description,
        questions: questions,
        showSalary,
        single,
        unitSalary,
        locationType,
      };

      const response = await fetch("/api/job/", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to post job");
      }
    } catch (error) {
      console.error("Error in submission process:", error);
      setErrorMessage(
        "Failed to post job. Please check your inputs and try again."
      );
    } finally {
      setUploading(false);
    }
  };

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

  const handleBackClick = () => {
    if (page === 0) {
      // Eğer ilk sayfadaysak, ana sayfaya dön
      router.push('/');
    } else {
      // Diğer durumlarda bir önceki sayfaya git
      setPage(page - 1);
    }
  };

  return (
    <div className={styles.Container}>
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
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
      <div className={styles.indicatorContainer}>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 0 ? styles.selectedIndicator : ""
          }`}
          onClick={() => setPage(0)} // No restriction for going back to the first page
        ></div>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 1 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle) {
              // Only allow advancing if fields are filled
              setPage(1);
            }
          }}
        ></div>
        <div
          className={`${styles.indicator} ${
            page === 2 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle) {
              // Only allow advancing if fields are filled
              setPage(2);
            }
          }}
        ></div>
      </div>

      {page === 0 ? (
        <EditClient
          image={logoURL}
          companyName={companyName}
          setCompanyName={setCompanyName}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          locationType={locationType}
          setLocationType={setLocationType}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          jobType={jobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          educationalDegree={educationalDegree}
          setEducationalDegree={setEducationalDegree}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          unit={unitSalary}
          setUnit={setUnitSalary}
          visa={visa}
          setVisa={setVisa}
          single={single}
          setSingle={setSingle}
          questions={questions}
          setQuestions={setQuestions}
          showSalary={showSalary}
          setShowSalary={setShowSalary}
          description={description}
          setDescription={setDescription}
          setPage={setPage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ) : page === 1 ? (
        <ReviewClient
          image={selectedImage}
          logoURL={logoURL} // Yeni eklenen prop
          companyName={companyName}
          jobTitle={jobTitle}
          selectedLocations={selectedLocations}
          jobType={jobType}
          experienceLevel={experienceLevel}
          educationalDegree={educationalDegree}
          min={min}
          max={max}
          visa={visa}
          description={description}
          setPage={setPage}
          locationType={locationType}
          unit={unitSalary}
          single={single}
          showSalary={showSalary}
          questions={questions}
        />
      ) : (
        <CheckoutClient
          oneJobIsChecked={oneJobIsChecked}
          setOneJobIsChecked={setOneJobIsChecked}
          monthlyChecked={monthlyChecked}
          setMonthlyChecked={setMonthlyChecked}
          fiveJobChecked={fiveJobChecked}
          setFiveJobChecked={setFiveJobChecked}
          Complete={Complete}
          uploading={uploading}
        />
      )}
    </div>
  );
};

export default Page;
