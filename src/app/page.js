import Link from "next/link";
import discover from "../../assets/discover.svg";
import rectagle from "../../assets/Rectangle.svg";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__home__left}>
          <Link href={"/"}>
            <div className={styles.header__link}>SKINSTRIC</div>
          </Link>
          <div className={styles.header__sublink}>{`[ intro ]`}</div>
        </div>
        <div className={styles.header__home__right}>ENTER CODE</div>
      </header>
      <main>
        <div className={styles.home__intro__layout}>
          <div>
            <div>
              <Image className={styles.rectagle} src={rectagle} alt="outline" />
            </div>
            <div className={styles.discover}>
              <Image src={discover} alt="DISCOVER A.I." />
            </div>
          </div>
          <div className={styles.home__title}>Sophistocated skincare</div>
          <div>
            <div className={styles.rectagle}>
              <Image src={rectagle} alt="outline" />
            </div>
            <div className={styles.discover}>
              <Image src={discover} alt="DISCOVER A.I." />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
