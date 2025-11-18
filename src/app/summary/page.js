'use client'
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "../../../assets/back.svg";
import proceed from "../../../assets/proceed.svg";
import { useSearchParams } from "next/navigation";


export default function Summary() {
    const params = useSearchParams();
    const data = JSON.parse(params.get("data") || "{}");

    console.log("AI output:", data);

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
        <div className={styles.start__analysis}>A.I. ANALYSIS</div>
        <div className={styles.start__analysis__title}>DEMOGRAPHICS</div>
        <div className={styles.start__analysis__text}>PREDICTED RACE & AGE</div>

        <div className={styles.demographics__wrapper}>
            <div className={styles.demographics__qualifiers__wrapper}>
                <div className={styles.demographics__category__wrapper}>RACE</div>
                <div className={styles.demographics__category__wrapper}>AGE</div>
                <div className={styles.demographics__category__wrapper}>SEX</div>
            </div>
            <div className={styles.demographics__display__wrapper}></div>
            <div className={styles.demographics__uniques__wrapper}></div>
        </div>

        <button className={`${styles.back__btn} ${styles.test__btn__small}`}>
          <Link href={"/results"}>
            <div className={styles.proceed__small}>
              <Image src={back} alt="back" />
            </div>
          </Link>
        </button>
        <div className={styles.start__analysis__bottom}>If the A.I estimate is wrong, select the correct descriptors.</div>
        <button className={`${styles.proceed__btn} ${styles.test__btn__small}`}>
          <Link href={"/"}>
            <div className={styles.proceed__small}>
              <Image src={proceed} alt="back" />
            </div>
          </Link>
        </button>
      </main>
        </>
    )
}