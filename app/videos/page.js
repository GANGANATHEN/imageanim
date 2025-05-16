"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../globals.css';

export default function Videos() {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className={styles.video}
          src="/v1.mp4"
          width={100}
          height={100}
          muted
          loop
        ></video>

        {hovered && (
          <div className={styles.overlay}>
            <Image
              src="/1.png"
              alt="Product"
              width={20}
              height={20}
              className={styles.productImage}
            />
            <h2 className={styles.title}>Awesome Product</h2>
            <p className={styles.description}>₹1,999 - Super cool features!</p>
          </div>
        )}
      </div>
    </div>
  );
}
