'use client';
import React, { useState } from 'react';
import '../globals.css';

export default function Indexs() {
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

  const handleHover = (index) => {
    console.log(index);
    
    if(index === 6) return;
    const newImages = [...images];
    const lastImage = newImages[6]; // index 6
    const hoveredImage = newImages[index];

    // remove hovered image
    newImages.splice(index, 1);

    // remove last image (index 6)
    newImages.splice(5, 1);

    // add last image to start
    newImages.unshift(lastImage);

    // add hovered image to end
    newImages.push(hoveredImage);

    setImages(newImages);
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
    </div>
  );
}
