import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaUsers, FaPaperPlane, FaConciergeBell, FaSignOutAlt } from 'react-icons/fa'; // İkonlar
import AuthenticationService from '../api/AuthenticationService';

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmDelete = window.confirm('Çıkış yapmak istediğinize emin misiniz ?');
    if (confirmDelete) {
        AuthenticationService.logout();
        navigate('/')
    }
};

  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-5 fixed flex flex-col justify-between z-50">
      <div>
        <div className="flex justify-between items-center mb-5">
          <NavLink to="/admin" className="text-xl font-bold">
            Yönetim İşlemleri
          </NavLink>
          <FaUser className="text-2xl" />
        </div>
        <hr className="border-gray-600 mb-5" />
        <ul className="space-y-4">
          <li>
            <NavLink to="/admin/account" className={({ isActive }) => isActive ? "text-orange-400 font-semibold" : ""}>
              <FaUser className="inline mr-2" /> Kullanıcı İşlemleri
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/employee" className={({ isActive }) => isActive ? "text-orange-400 font-semibold" : ""}>
              <FaUsers className="inline mr-2" /> Personel İşlemleri
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/post" className={({ isActive }) => isActive ? "text-orange-400 font-semibold" : ""}>
              <FaPaperPlane className="inline mr-2" /> Gönderi İşlemleri
            </NavLink>
          </li>
        </ul>
      </div>
      <div onClick={handleLogout}>
        <NavLink className="flex items-center text-white mt-5">
          <FaSignOutAlt className="mr-2 text-xl" />
          Çıkış Yap
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNavbar;
