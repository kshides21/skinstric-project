"use client";
import styles from "../testing/page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import rombuses from "../../../assets/rombuses.svg";
import rombusesSmall from "../../../assets/rombuses2.svg";
import { VscCircleFilled } from "react-icons/vsc";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Loading() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
      AOS.init({
        duration: 600,
        once: true,
      });
    }, []);

  useEffect(() => {
    async function fakeUpload() {
      await new Promise((res) => setTimeout(res, 3000));

      setShowSuccess(true);
    }

    fakeUpload();
  }, []);

  const handleOK = () => {
    router.push("/selection");
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

          { showSuccess ?
          (<h1 className={styles.title__text__loading}>
            ANALYSIS COMPLETE
          </h1>)
          :
          (<p className={styles.title__text__loading}>
            PREPARING YOUR ANALYSIS...
          </p>)}
          {!showSuccess && (<div className={styles.loading__circles}>
            <VscCircleFilled
              className={`${styles.circle1} ${styles.loading__circle}`}
            />
            <VscCircleFilled
              className={`${styles.circle2} ${styles.loading__circle}`}
            />
            <VscCircleFilled
              className={`${styles.circle3} ${styles.loading__circle}`}
            />
          </div>)}
          {showSuccess && (
            <button data-aos="fade-up" onClick={handleOK} className={`${styles.results__btn} ${styles.test__btn__small}`}>SEE RESULTS</button>
          )}
        </div>
      </main>
    </>
  );
}
