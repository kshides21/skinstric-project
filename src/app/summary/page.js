"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "../../../assets/back.svg";
import proceed from "../../../assets/proceed.svg";
import option from "../../../assets/option.svg";
import optionFilled from "../../../assets/option__filled.svg";
import { useEffect, useState } from "react";

export default function Summary() {
  const [analysis, setAnalysis] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedSex, setSelectedSex] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedPercentage, setSelectedPercentage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!analysis?.data) return;

    const { race, age, gender } = analysis.data;

    const getMaxEntry = (obj) =>
      Object.entries(obj).reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      );

    const [maxRaceLabel, maxRaceValue] = getMaxEntry(race);
    const [maxAgeLabel, maxAgeValue] = getMaxEntry(age);
    const [maxSexLabel, maxSexValue] = getMaxEntry(gender);

    setSelectedRace(maxRaceLabel);
    setSelectedAge(maxAgeLabel);
    setSelectedSex(maxSexLabel);

    if (selectedCategory === "race") {
      setSelectedOption(maxRaceLabel);
      setSelectedPercentage(maxRaceValue);
    } else if (selectedCategory === "age") {
      setSelectedOption(maxAgeLabel);
      setSelectedPercentage(maxAgeValue);
    } else if (selectedCategory === "sex") {
      setSelectedOption(maxSexLabel);
      setSelectedPercentage(maxSexValue);
    }
  }, [analysis]);

  const data = analysis?.data;
  if (!data) {
    return <div className={styles.loading}>Loading Data Analysis...</div>;
  }

  const sortedRaceData = Object.fromEntries(
  Object.entries(data.race).sort((a, b) => b[1] - a[1])
  );

  const sortedSexData = Object.fromEntries(
  Object.entries(data.gender).sort((a, b) => b[1] - a[1])
  );

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
            {selectedCategory === "race" ? (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("race");
                  setSelectedOption(selectedRace);
                  setSelectedPercentage(data.race[selectedRace]);
                }}
                style={{ backgroundColor: "#1a1b1c" }}
              >
                {selectedRace && (
                  <>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      {selectedRace.toUpperCase()}
                    </div>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      RACE
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("race");
                  setSelectedOption(selectedRace);
                  setSelectedPercentage(data.race[selectedRace]);
                }}
              >
                {selectedRace && (
                  <>
                    <div className={styles.demographics__category}>
                      {selectedRace.toUpperCase()}
                    </div>
                    <div className={styles.demographics__category}>RACE</div>
                  </>
                )}
              </div>
            )}

            {selectedCategory === "age" ? (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("age");
                  setSelectedOption(selectedAge);
                  setSelectedPercentage(data.age[selectedAge]);
                }}
                style={{ backgroundColor: "#1a1b1c" }}
              >
                {selectedAge && (
                  <>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      {selectedAge.toUpperCase()}
                    </div>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      AGE
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("age");
                  setSelectedOption(selectedAge);
                  setSelectedPercentage(data.age[selectedAge]);
                }}
              >
                {selectedAge && (
                  <>
                    <div className={styles.demographics__category}>
                      {selectedAge.toUpperCase()}
                    </div>
                    <div className={styles.demographics__category}>AGE</div>
                  </>
                )}
              </div>
            )}

            {selectedCategory === "sex" ? (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("sex");
                  setSelectedOption(selectedSex);
                  setSelectedPercentage(data.gender[selectedSex]);
                }}
                style={{ backgroundColor: "#1a1b1c" }}
              >
                {selectedSex && (
                  <>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      {selectedSex.toUpperCase()}
                    </div>
                    <div
                      className={styles.demographics__category}
                      style={{ color: "#fff" }}
                    >
                      SEX
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                className={styles.demographics__category__wrapper}
                onClick={() => {
                  setSelectedCategory("sex");
                  setSelectedOption(selectedSex);
                  setSelectedPercentage(data.gender[selectedSex]);
                }}
              >
                {selectedSex && (
                  <>
                    <div className={styles.demographics__category}>
                      {selectedSex.toUpperCase()}
                    </div>
                    <div className={styles.demographics__category}>SEX</div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.demographics__display__wrapper}>
            <div className={styles.center__circle__wrapper}>
              {selectedOption && (
                <>
                  <div className={styles.center__label}>
                    {selectedCategory === "age"
                      ? `${selectedOption.toUpperCase()} y.o.`
                      : selectedOption.toUpperCase()}
                  </div>

                  <svg
                    className={styles.circle}
                    width="320"
                    height="320"
                    viewBox="0 0 280 280"
                    style={{ overflow: "visible" }}
                  >
                    <g transform="rotate(-90 140 140)">
                      <circle className={styles.bg} cx="140" cy="140" r="162" />
                      <circle
                        className={styles.fg}
                        cx="140"
                        cy="140"
                        r="162"
                        style={{
                          strokeDashoffset:
                            1018 - 1018 * (selectedPercentage || 0),
                        }}
                      />
                    </g>

                    <text
                      x="50%"
                      y="54%"
                      textAnchor="middle"
                      className={styles.percent__text}
                    >
                      {(selectedPercentage * 100).toFixed(0)}%
                    </text>
                  </svg>
                </>
              )}
            </div>
          </div>

          <div className={styles.demographics__uniques__wrapper}>
            <div className={styles.option__header}>
              {selectedCategory === "race" && (
                <div className={styles.option__title}>RACE</div>
              )}
              {selectedCategory === "age" && (
                <div className={styles.option__title}>AGE</div>
              )}
              {selectedCategory === "sex" && (
                <div className={styles.option__title}>SEX</div>
              )}
              <div>A.I. Confidence</div>
            </div>
            {selectedCategory === "race" &&
              Object.entries(sortedRaceData).map(([label, value]) => {
                const isSelected = selectedRace === label;

                return (
                  <div
                    key={label}
                    className={styles.option__row}
                    style={isSelected ? { backgroundColor: "#1a1b1c" } : {}}
                    onClick={() => {
                      setSelectedRace(label);
                      setSelectedOption(label);
                      setSelectedPercentage(value);
                    }}
                  >
                    <div
                      className={styles.option__title}
                      style={isSelected ? { color: "#fff" } : {}}
                    >
                      <div className={styles.option__title__img}>
                        <Image
                          src={isSelected ? optionFilled : option}
                          alt="bullet"
                        />
                      </div>

                      <div>{label.toUpperCase()}</div>
                    </div>

                    <div style={isSelected ? { color: "#fff" } : {}}>
                      {(value * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })}

            {selectedCategory === "age" &&
              Object.entries(data.age).map(([label, value]) => {
                const isSelected = selectedAge === label;

                return (
                  <div
                    key={label}
                    className={styles.option__row}
                    style={isSelected ? { backgroundColor: "#1a1b1c" } : {}}
                    onClick={() => {
                      setSelectedAge(label);
                      setSelectedOption(label);
                      setSelectedPercentage(value);
                    }}
                  >
                    <div
                      className={styles.option__title}
                      style={isSelected ? { color: "#fff" } : {}}
                    >
                      <div className={styles.option__title__img}>
                        <Image
                          src={isSelected ? optionFilled : option}
                          alt="bullet"
                        />
                      </div>

                      <div>{label.toUpperCase()}</div>
                    </div>

                    <div style={isSelected ? { color: "#fff" } : {}}>
                      {(value * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })}

            {selectedCategory === "sex" &&
              Object.entries(sortedSexData).map(([label, value]) => {
                const isSelected = selectedSex === label;

                return (
                  <div
                    key={label}
                    className={styles.option__row}
                    style={isSelected ? { backgroundColor: "#1a1b1c" } : {}}
                    onClick={() => {
                      setSelectedSex(label);
                      setSelectedOption(label);
                      setSelectedPercentage(value);
                    }}
                  >
                    <div
                      className={styles.option__title}
                      style={isSelected ? { color: "#fff" } : {}}
                    >
                      <div className={styles.option__title__img}>
                        <Image
                          src={isSelected ? optionFilled : option}
                          alt="bullet"
                        />
                      </div>

                      <div>{label.toUpperCase()}</div>
                    </div>

                    <div style={isSelected ? { color: "#fff" } : {}}>
                      {(value * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <button className={`${styles.back__btn} ${styles.test__btn__small}`}>
          <Link href={"/results"}>
            <div className={styles.proceed__small}>
              <Image src={back} alt="back" />
            </div>
          </Link>
        </button>
        <div className={styles.start__analysis__bottom}>
          If the A.I estimate is wrong, select the correct descriptors.
        </div>
        <button className={`${styles.proceed__btn} ${styles.test__btn__small}`}>
          <Link href={"/"}>
            <div className={styles.proceed__small}>
              <Image src={proceed} alt="back" />
            </div>
          </Link>
        </button>
      </main>
    </>
  );
}
