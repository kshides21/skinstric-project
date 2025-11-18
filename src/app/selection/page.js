'use client'
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "../../../assets/back.svg";
import summary from "../../../assets/summary.svg";
import weather from "../../../assets/weather.svg";
import demographics from "../../../assets/demographics.svg";
import skin from "../../../assets/skinType.svg";
import concerns from "../../../assets/concerns.svg";
import diamond from "../../../assets/rombusesDiamond.svg";
import { useRouter } from "next/navigation";

export default function Selection() {
  const router = useRouter();
  
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
        <div className={styles.start__analysis__text}>
          A.I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </div>

        <div className={styles.select__wrapper}>
          <div className={styles.northsouth__wrapper}>
            <button className={styles.test__btn__small}  onClick={() => router.push('/summary')}>
              <div className={styles.demographics}>
                <Image src={demographics} alt="demos" />
              </div>
            </button>
            <div className={styles.weather}>
              <Image src={weather} alt="weather" />
            </div>
          </div>

          <div className={styles.eastwest__wrapper}>
            <div className={styles.concerns}>
              <Image src={concerns} alt="concerns" />
            </div>
            <div className={styles.skin}>
              <Image src={skin} alt="skin" />
            </div>
          </div>

          <div className={styles.diamond}>
            <Image src={diamond} alt="background" />
          </div>
        </div>

        <button className={`${styles.back__btn} ${styles.test__btn__small}`}>
          <Link href={"/results"}>
            <div className={styles.proceed__small}>
              <Image src={back} alt="back" />
            </div>
          </Link>
        </button>
        <button className={`${styles.summary__btn} ${styles.test__btn__small}`}>
          <Link href={"/summary"}>
            <div className={styles.proceed__small}>
              <Image src={summary} alt="back" />
            </div>
          </Link>
        </button>
      </main>
    </>
  );
}
