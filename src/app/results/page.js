"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "../../../assets/back.svg";
import rombusesSmall from "../../../assets/rombuses2.svg";
import gallery from "../../../assets/gallery.svg";
import galleryText from "../../../assets/galleryTitle.svg";
import camera from "../../../assets/camera.svg";
import cameraText from "../../../assets/cameraTitle.svg";

export default function Results() {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (base64Image) => {
    setLoading(true);

    try {
      router.push("/loading");

      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      const data = await response.json();

      localStorage.setItem("analysisResult", JSON.stringify(data));

      router.push("/loading");
    } catch (err) {
      console.error(err);
      alert("Error analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__home__left}>
          <Link className={styles.header__link__wrapper} href={"/"}>
            <div className={styles.header__link}>SKINSTRIC</div>
          </Link>
          <div className={styles.header__sublink}>{`[ intro ]`}</div>
        </div>
        <div className={styles.header__home__right}>ENTER CODE</div>
      </header>
      <main>
        <div className={styles.start__analysis}>TO START ANALYSIS</div>

        <div className={styles.analysis__wrapper}>
          <div className={styles.analysis__item}>
            <div className={styles.rombus__outline__small}>
              <Image src={rombusesSmall} alt="outline" />
            </div>
            <button className={styles.photo__wrapper}>
              <div>
                <Image src={camera} alt="camera" />
              </div>
            </button>
            <div className={styles.photo__text}>
              <Image src={cameraText} alt="camera" />
            </div>
          </div>
          <div className={styles.analysis__item}>
            <div className={styles.rombus__outline__small}>
              <Image src={rombusesSmall} alt="outline" />
            </div>
            <div className={styles.gallery__text}>
              <Image src={galleryText} alt="gallery" />
            </div>

            <button
              className={styles.photo__wrapper}
              onClick={() => fileInputRef.current?.click()}
            >
              <div>
                <Image src={gallery} alt="gallery" />
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const base64 = await toBase64(file);

                if (!base64.startsWith("data:image")) {
                  alert("Image must be base64.");
                  return;
                }

                await handleUpload(base64);
              }}
            />
          </div>
        </div>

        <button className={`${styles.back__btn} ${styles.test__btn__small}`}>
          <Link href={"/testing"}>
            <div className={styles.proceed__small}>
              <Image src={back} alt="back" />
            </div>
          </Link>
        </button>
      </main>
    </>
  );
}