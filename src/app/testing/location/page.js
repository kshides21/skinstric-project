"use client";

import Link from "next/link";
import styles from "../page.module.css";
import rombuses from "../../../../assets/rombuses.svg";
import rombusesSmall from "../../../../assets/rombuses2.svg";
import back from "../../../../assets/back.svg";
import proceed from "../../../../assets/proceed.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TestingLocation() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("skinstric_name");
    if (!storedName) router.push("/testing");
    setName(storedName || "");
  }, []);

  const validateLocation = () => {
    if (!location.trim()) return "Location is required.";
    if (!/^[A-Za-z\s]+$/.test(location)) return "Location must contain only letters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateLocation();
    if (err) {
      setError(err);
      return;
    }

    localStorage.setItem("skinstric_name", location.trim());

    await fetch(
      "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location: location.trim(),
        }),
      }
    );

    router.push("/testing/results");
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
        <form onSubmit={handleSubmit} className={styles.titleWrapper}>
          <div className={styles.rombus__wrapper}>
            <div
              className={`${styles.rombus__outline__big} ${styles.rombus__outline}`}
            >
              <Image src={rombuses} alt="outline" />
            </div>
            <div
              className={`${styles.rombus__outline__small} ${styles.rombus__outline}`}
            >
              <Image src={rombusesSmall} alt="outline" />
            </div>
          </div>
          <p className={styles.title__text__small}>CLICK TO TYPE</p>

          <input
            className={styles.home__title}
            placeholder="Your City Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {error && <p className={styles.errorText}>{error}</p>}

          <button className={styles.test__btn__small}>
            <Link href={"/results"}>
              <div className={styles.proceed__small}>
                <Image src={proceed} alt="outline" />
              </div>
            </Link>
          </button>
        </form>

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
