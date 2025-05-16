"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import '../globals.css';

const Image1 = () => {
  const originalImages = [
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',
    '/7.png',
  ];

  const [images, setImages] = useState(originalImages);
  const [hoveredImage, setHoveredImage] = useState(images[images.length - 1]); // Default last

  const handleHover = (index) => {
    setHoveredImage(images[index]);
  };

  return (
    <div className="image-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`img-${index}`}
          className="image-item"
          onMouseEnter={() => handleHover(index)}
        />
      ))}
      {/* 8th image - dynamic duplicate of hovered image */}
      <img
        src={hoveredImage}
        alt="duplicate"
        className="image-item duplicate"
      />
    </div>
  );
};

export default Image1;