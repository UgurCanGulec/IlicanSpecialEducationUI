import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminPanel = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 p-5 overflow-auto ml-[20%]">
        <Outlet />
        {showMessage && (
          <p className="mt-5 text-lg text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out">
            Yönetim paneline hoş geldiniz! Lütfen sol menüden yapmak istediğiniz işlemi seçerek devam edin.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
