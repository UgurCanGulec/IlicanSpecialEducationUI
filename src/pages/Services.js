import React from 'react';
import servicesImage from '../images/services.jpg';
import ProgramSlider from '../components/ProgramSlider';
import { services } from '../library/Constants'

const Services = () => {
  return (
    <div className="relative">
      <div
        className="py-40 text-center text-white px-4 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${servicesImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <h2 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">
            Hizmetlerimize Göz Atabilirsiniz
          </h2>
          <div className="max-w-7xl mx-auto px-4">
            <ProgramSlider services={services} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
