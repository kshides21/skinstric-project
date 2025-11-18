'use client'
import { useEffect } from "react";
import Link from "next/link";
import discover from "../../assets/discover.svg";
import test from "../../assets/take-test.svg";
import rectagle from "../../assets/Rectangle.svg";
import rombuses from "../../assets/rombuses.svg";
import Image from "next/image";
import styles from "./page.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
  }, []);

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
        <div className={styles.home__intro__layout}>
          <div className={styles.leftSide}>
            <div>
              <Image
                className={styles.rectangle}
                src={rectagle}
                alt="outline"
              />
            </div>
            <div className={styles.discover__wrapper}>
              <button className={styles.discover__btn}>
                <div className={styles.discover}>
                  <Image src={discover} alt="DISCOVER A.I." />
                </div>
              </button>
            </div>
          </div>

          <div className={styles.titleWrapper}>
            <div className={styles.rombus__outline}>
              <Image src={rombuses} alt="outline" />
            </div>
            <div data-aos="fade-in">
              <h1 className={styles.home__title}>
                Sophistocated <br /> skincare
              </h1>
            </div>
            <p className={styles.title__text__small}>
              SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED
              ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
            </p>
            <button className={styles.test__btn__small}>
              <Link href={"/testing"}>
              <div className={styles.proceed__small}>
                <Image src={test} alt="outline" />
              </div>
              </Link>
            </button>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.rectangle__right}>
              <Image src={rectagle} alt="outline" />
            </div>
            <div className={styles.test__wrapper}>
              <button className={styles.test__btn}>
                <Link href={"/testing"}>
                <div className={styles.test__normal}>
                  <Image src={test} alt="take test" />
                </div>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <p className={styles.title__text}>
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </main>
    </>
  );
}
