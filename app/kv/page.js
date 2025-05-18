"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../globals.css";

const myObj = [
  { image: "/1.png", imagechild: [{ name: "/1.png" }, { name: "/1.png" }] },
  { image: "/2.png", imagechild: [{ name: "/2.png" }, { name: "/1.png" }] },
  { image: "/3.png", imagechild: [{ name: "/3.png" }, { name: "/1.png" }] },
  { image: "/4.png", imagechild: [{ name: "/4.png" }, { name: "/1.png" }] },
  { image: "/5.png", imagechild: [{ name: "/5.png" }, { name: "/1.png" }] },
  { image: "/6.png", imagechild: [{ name: "/6.png" }, { name: "/1.png" }] },
  { image: "/7.png", imagechild: [{ name: "/7.png" }, { name: "/1.png" }] },
];

const Upload = () => {
  const scrollRef = useRef(null);
  const imageRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = myObj.length;

  // Prepare duplicated data: [ghost_end][original][ghost_start]
  const extendedImages = [...myObj, ...myObj, ...myObj];
  const realStartIndex = total;

  // On first mount: scroll to middle block
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const middle = el.scrollWidth / 3; // start of real set
      el.scrollLeft = middle;
    }
  }, []);

  // Handle infinite loop logic
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      const totalWidth = el.scrollWidth / 3;
      const maxScroll = el.scrollWidth - el.offsetWidth;

      // If user scrolls too far to clone start
      if (el.scrollLeft < totalWidth * 0.5) {
        el.scrollLeft += totalWidth;
      }

      // If user scrolls too far to clone end
      else if (el.scrollLeft > totalWidth * 1.5) {
        el.scrollLeft -= totalWidth;
      }

      // Update visible index
      const containerRect = el.getBoundingClientRect();
      let visibleIdx = realStartIndex; // fallback

      imageRefs.current.forEach((imgRef, idx) => {
        if (imgRef) {
          const rect = imgRef.getBoundingClientRect();
          const right = rect.right - containerRect.left;
          if (right <= el.offsetWidth) {
            visibleIdx = idx;
          }
        }
      });

      const actualIdx = visibleIdx % total;
      setSelectedIndex(actualIdx);
    };

    if (el) el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="static-slider-container">
      <h2>Infinite Manual Scroll</h2>
      <div className="static-slider">
        <div className="flow-slider">
          <div className="flow-wrapper" ref={scrollRef}>
            <div className="flow-track" style={{ display: "flex" }}>
              {extendedImages.map((item, index) => (
                <div
                  key={index}
                  className="flow-slide"
                  ref={(el) => (imageRefs.current[index] = el)}
                  style={{ flex: "0 0 auto", marginRight: "10px" }}
                >
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={`img-${index}`}
                    className="image-item"
                  />
                  <p style={{ textAlign: "center" }}>{index % total}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="static-set">
          {myObj[selectedIndex].imagechild.map((child, idx) => (
            <div key={idx}>
              <Image
                src={child.name}
                width={100}
                height={100}
                alt={`child-${idx}`}
                className="image-item"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
