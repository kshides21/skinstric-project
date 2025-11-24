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
import { VscCircleFilled } from "react-icons/vsc";

export default function TestingLocation() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("skinstric_name");
    if (!storedName) router.push("/testing");
    setName(storedName || "");
  }, []);

  const validateLocation = () => {
    if (!location.trim()) return "Location is required.";
    if (!/^[A-Za-z\s]+$/.test(location))
      return "Location must contain only letters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateLocation();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");

    try {
      localStorage.setItem("skinstric_location", location.trim());

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

      setSubmitted(true);
      setLoading(false);
      setTimeout(() => 2000);
    } catch (err) {
      setError("Something went wrong. Try again.");
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

        {loading && (
          <div className={styles.titleWrapper}>
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

            <p className={styles.title__text__loading}>Processing submission</p>
            <div className={styles.loading__circles}>
              <VscCircleFilled
                className={`${styles.circle1} ${styles.loading__circle}`}
              />
              <VscCircleFilled
                className={`${styles.circle2} ${styles.loading__circle}`}
              />
              <VscCircleFilled
                className={`${styles.circle3} ${styles.loading__circle}`}
              />
            </div>
          </div>
        )}

        {!loading && submitted && (
          <div className={styles.titleWrapper}>
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

            <p className={styles.title__text__submitted}>Thank you!</p>
            <p className={styles.title__subtext__submitted}>
              proceed to the next step
            </p>

            <button
              className={`${styles.test__btn__small} ${styles.test__btn__proceed}`}
            >
              <Link href={"/results"}>
                <div className={styles.proceed__small}>
                  <Image src={proceed} alt="proceed" />
                </div>
              </Link>
            </button>
          </div>
        )}

        {!loading && !submitted && (
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
          </form>
        )}

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
