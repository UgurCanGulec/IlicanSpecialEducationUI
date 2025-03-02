import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaSquareTwitter, FaInstagram, FaBars, FaXmark } from 'react-icons/fa6';
import Modal from './Modal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navItems = [
    { path: '/', link: 'Ana Sayfa' },
    { path: '/services', link: 'Programlarımız' },
    { path: '/about', link: 'Kurumsal' },
    { path: '/blogs', link: 'Etkinlikler' },
    { path: '/contact', link: 'İletişim' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'bg-gray-800 text-white' : 'bg-transparent text-white'
      } transition-all duration-300 ease-in-out`}
    >
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <a href='/' className='text-xl font-bold text-white'>
          Ilıcan <span className='text-orange-400'>Özel</span> Eğitim Merkezi
        </a>

        <ul className='md:flex gap-12 text-lg hidden'>
          {navItems.map(({ path, link }) => (
            <li className='text-white' key={path}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
                to={path}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='flex gap-4 items-center'>
          <a
            href='https://www.facebook.com/p/ILICAN-%C3%96ZEL-E%C4%9E%C4%B0T%C4%B0M-VE-REHAB%C4%B0L%C4%B0TASYON-MERKEZ%C4%B0-100057371953313/?locale=tr_TR'
            className='text-white hover:text-orange-500'
          >
            <FaFacebook />
          </a>
          <a href='/' className='text-white hover:text-orange-500'>
            <FaSquareTwitter />
          </a>
          <a href='/' className='text-white hover:text-orange-500'>
            <FaInstagram />
          </a>
          <button
            onClick={openModal}
            className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in'
          >
            Oturum Aç
          </button>
        </div>

        {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        <div className='md:hidden'>
          <button className='cursor-pointer' onClick={toggleMenu}>
            {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      <ul
        className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 bg-white transition-all ease-in-out duration-300 ${
          isMenuOpen ? 'fixed top-16 left-0 w-full z-40' : 'hidden'
        }`}
      >
        {navItems.map(({ path, link }) => (
          <li className='text-black' key={path}>
            <NavLink onClick={toggleMenu} to={path}>
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
