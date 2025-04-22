import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaFacebook,
  FaSquareTwitter,
  FaInstagram,
  FaBars,
  FaXmark,
} from 'react-icons/fa6';
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-gray-800 text-white' : 'bg-transparent text-white'
        }`}
    >
      <nav className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-white">
          Ilıcan <span className="text-orange-400">Özel</span> Eğitim Merkezi
        </a>

        <ul className="hidden md:flex gap-10 text-base">  {/* lg -> md */}
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? 'text-orange-400' : 'hover:text-orange-400'
                }
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <a
            href="https://www.facebook.com"
            className="text-white hover:text-orange-500"
          >
            <FaFacebook />
          </a>
          <a href="/" className="text-white hover:text-orange-500">
            <FaSquareTwitter />
          </a>
          <a href="/" className="text-white hover:text-orange-500">
            <FaInstagram />
          </a>
          <button
            onClick={openModal}
            className="hidden md:block bg-orange-500 px-4 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition duration-200"
          >
            Oturum Aç
          </button>

          <div className="md:hidden">  
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <FaXmark className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <ul
        className={`md:hidden bg-white text-black text-base space-y-4 px-6 py-6 transition-all duration-300 ease-in-out ${isMenuOpen ? 'fixed top-16 left-0 w-full z-40' : 'hidden'
          }`} 
      >
        {navItems.map(({ path, link }) => (
          <li key={path}>
            <NavLink
              onClick={toggleMenu}
              to={path}
              className="block hover:text-orange-500"
            >
              {link}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              toggleMenu();
              openModal();
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
          >
            Oturum Aç
          </button>
        </li>
      </ul>

      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </header>
  );
};

export default Navbar;
