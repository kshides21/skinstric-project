import Link from "next/link";
import discover from "../../assets/discover.svg";
import test from "../../assets/take-test.svg";
import rectagle from "../../assets/Rectangle.svg";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
            <h1 className={styles.home__title}>
              Sophistocated <br /> skincare
            </h1>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.rectangle__right}>
              <Image src={rectagle} alt="outline" />
            </div>
            <div className={styles.test__wrapper}>
              <button className={styles.test__btn}>
                <div className={styles.test__normal}>
                  <Image src={test} alt="take test" />
                </div>
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
