import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Banner = () => {
  const [displayedText, setDisplayedText] = useState(''); 
  const [subText, setSubText] = useState('');
  const [index, setIndex] = useState(0); 
  const [subIndex, setSubIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText = "Ilıcan Özel Eğitim Merkezi"; 
  const fullSubText = "Özel çocuklara özel çözümler sunuyoruz."; 
  const typingSpeed = 100; 

  useEffect(() => {
    if (hasAnimated) return;

    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedText((prevText) => prevText + fullText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    const typeSubText = () => {
      if (subIndex < fullSubText.length) {
        setSubText((prevText) => prevText + fullSubText[subIndex]);
        setSubIndex((prevIndex) => prevIndex + 1);
      }
    };

    const typingInterval = setInterval(typeText, typingSpeed);
    const subTypingInterval = setInterval(typeSubText, typingSpeed);

    const completeAnimation = () => {
      clearInterval(typingInterval);
      clearInterval(subTypingInterval);
      setHasAnimated(true);
    };

    setTimeout(completeAnimation, (fullText.length + fullSubText.length) * typingSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(subTypingInterval);
    };
  }, [index, subIndex, hasAnimated]);

  return (
    <div 
      className="relative px-9 py-72 mx-auto bg-cover bg-center" 
    >
      <div className="relative text-white text-center z-10">
        <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">
          {displayedText} 
        </h1>
        <p className="text-gray-100 lg:w-3/5 mx-auto mb-5">
          {subText} 
        </p>
        <div>
          <Link 
            to="/services" 
            className="font-medium hover:text-orange-500 inline-flex items-center py-1"
          >
            Detaylar
            <FaArrowRight className="mt-1 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
