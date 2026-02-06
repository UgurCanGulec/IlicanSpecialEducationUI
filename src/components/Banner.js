import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Banner = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [subText, setSubText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText = "Özel Ilıcan Özel Eğitim ve Rehabilitasyon Merkezi";
  const fullSubText = "Özel Eğitimde Tek Otoriteyiz...";
  const typingSpeed = 80;

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
    <div className="relative px-9 py-72 mx-auto bg-cover bg-center">
      <div className="relative text-white text-center z-10">
        <h1 className="text-4xl lg:text-6xl font-bold font-primary leading-snug mb-5 animate-fall-down">
          {displayedText}
        </h1>

        <p className="lg:w-3/5 mx-auto text-3xl lg:text-4xl font-poppins font-semibold text-yellow-300 drop-shadow-lg animate-fall-down-sub mb-8">
          {subText}
        </p>

        <div>
          <Link
            to="/services"
            className="text-white font-medium hover:text-orange-500 inline-flex items-center py-1"
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
