import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import bgImage from '../images/contact-bg.jpg';

const Contact = () => {
  return (
    <div
      className='relative bg-cover bg-top bg-no-repeat'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='absolute inset-0 bg-black/70'></div>
      <div className='relative max-w-7xl mx-auto py-20 px-6 lg:flex lg:justify-between items-center text-white'>
        <div className='lg:w-1/2'>
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>Bizimle İrtibata Geçin</h2>
          <div className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <FaEnvelope className='text-yellow-400 text-2xl' />
              <p className='text-lg'>ilicanozelegitim@hotmail.com</p>
            </div>
            <div className='flex items-center space-x-4'>
              <FaMapMarkerAlt className='text-yellow-400 text-3xl' />
              <p className='text-lg'>TABAKLAR YAZIYAKA MAH. GÖKCESU CAD. NO: 104 İÇ KAPI NO: 1 MENGEN / BOLU</p>
            </div>
            <div className='flex items-center space-x-4'>
              <FaPhoneAlt className='text-yellow-400 text-2xl' />
              <p className='text-lg'>0374 356 2484</p>
            </div>
            <div className='flex items-center space-x-4'>
              <FaPhoneAlt className='text-yellow-400 text-2xl' />
              <p className='text-lg'>+90 535 789 19 85</p>
            </div>
          </div>
        </div>
        <div className='lg:w-1/2 mt-10 lg:mt-0'>
          <iframe
            title='Google Maps Location'
            className='w-full h-64 lg:h-80 rounded-lg shadow-lg'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.8036214540897!2d32.05995407608254!3d40.93741777140071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409da338ff6c8c7f%3A0x5e6e5f0f2bbbe0f1!2sTABAKLAR%20YAZIYAKA%20MAH.%20G%C3%96KCESU%20CAD.%20NO%3A%20104%20%C4%B0%C3%87%20KAPI%20NO%3A%201%2C%2014870%20Mengen%2FBolu%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1700000000000'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;