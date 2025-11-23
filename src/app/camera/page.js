"use client";
import styles from "../testing/page.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import takePhoto from "../../../assets/takePhoto.svg";
import rombuses from "../../../assets/rombuses.svg";
import rombusesSmall from "../../../assets/rombuses2.svg";
import cameraIcon from "../../../assets/camera.svg";
import diamond from "../../../assets/option.svg";

export default function Camera() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // STEP 1 — Show 3s loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      startCamera();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // STEP 2 — Start camera after loading
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setCameraReady(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied.");
    }
  };

  // STEP 3 — Capture frame from video
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/png");

    setCapturedImage(base64);
  };

  // STEP 4 — Confirm and send captured photo to next step
  const handleConfirm = () => {
    if (!capturedImage) return;

    // store like uploaded image
    localStorage.setItem("uploadedImage", capturedImage);

    // stop camera stream
    streamRef.current?.getTracks().forEach((t) => t.stop());

    router.push("/selection");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__home__left}>
          <Link href="/" className={styles.header__link__wrapper}>
            <div className={styles.header__link}>SKINSTRIC</div>
          </Link>
          <div className={styles.header__sublink}>{`[ intro ]`}</div>
        </div>
        <div className={styles.header__home__right}>ENTER CODE</div>
      </header>

      <main>
        <div className={styles.start__analysis}>TO START ANALYSIS</div>

        <div className={styles.titleWrapper}>
          
          {loading && (
            <>
              <div className={styles.rombus__wrapper}>
                <div className={`${styles.rombus__outline__big} ${styles.rombus__outline}`}>
                  <Image src={rombuses} alt="outline" />
                </div>
                <div className={`${styles.rombus__outline__small} ${styles.rombus__outline}`}>
                  <Image src={rombusesSmall} alt="outline" />
                </div>
              </div>

              <div className={styles.loading__wrapper}>
                <div className={styles.img__wrapper}>
                  <Image src={cameraIcon} alt="camera" />
                </div>
                <p className={styles.title__text__loading}>SETTING UP CAMERA...</p>
              </div>

              <div className={styles.camera__text}>
                <h4>TO GET BETTER RESULTS, MAKE SURE TO HAVE</h4>

                <div className={styles.camera__bullets}>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>NEUTRAL EXPRESSION</h4>
                  </div>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>FRONTAL POSE</h4>
                  </div>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>ADEQUATE LIGHTING</h4>
                  </div>
                </div>
              </div>
            </>
          )}

          {!loading && cameraReady && !capturedImage && (
            <div className={styles.camera__live}>
              <video ref={videoRef} className={styles.video} />

              <div className={`${styles.camera__text__live} ${styles.camera__text}`}>
                <h4>TO GET BETTER RESULTS, MAKE SURE TO HAVE</h4>

                <div className={styles.camera__bullets}>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>NEUTRAL EXPRESSION</h4>
                  </div>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>FRONTAL POSE</h4>
                  </div>
                  <div className={styles.camera__bullet}>
                    <Image className={styles.camera__bullet__img} src={diamond} alt="bullet" />
                    <h4>ADEQUATE LIGHTING</h4>
                  </div>
                </div>
              </div>

              <button
                onClick={capturePhoto}
                className={`${styles.photo__btn} ${styles.test__btn__small}`}
              >
                <Image src={takePhoto} alt="take photo"/>
              </button>
            </div>
          )}

          {capturedImage && (
            <div className={styles.camera__preview}>
              <img src={capturedImage} className={styles.captured__img} />
              <h4 className={styles.great__shot}>GREAT SHOT!</h4>

              <button
                onClick={handleConfirm}
                className={`${styles.results__btn} ${styles.test__btn__small}`}
              >
                PROCEED
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </main>
    </>
  );
}
