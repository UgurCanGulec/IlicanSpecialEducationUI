import React, { useEffect, useState } from 'react';
import AccountManagementSlider from './AccountManagementSlider';
import AccountService from '../../api/AccountService';
import { toast, ToastContainer } from 'react-toastify';
import { validateBeforeAccountSave } from '../../util/ApplicationUtil';

const AccountOperation = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({
    id: '',
    email: '',
    username: '',
    role: 'PERSONEL',
    isActive: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllAccounts(token);
  }, []);

  const getAllAccounts = async (token) => {
    try {
      const result = await AccountService.getAllAccounts(token);
      setAccounts(result.data.accounts);
    } catch (error) {
      console.error("Hesaplar alınırken hata oluştu:", error);
    }
  };

  const cardUpdateOnClick = (id) => {
    const account = accounts.find(item => item.id === id);
    setSelectedAccount(account || {
      id: '',
      email: '',
      username: '',
      role: 'PERSONEL',
      isActive: false
    });
  };

  const handleClear = () => {
    setSelectedAccount({
      id: '',
      email: '',
      username: '',
      role: 'PERSONEL',
      isActive: false
    });
  };

  const handleSave = async () => {
    if (validateBeforeAccountSave(selectedAccount)) {
      try {
        const token = localStorage.getItem('token');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated && token) {
          if (selectedAccount && selectedAccount.id) {
            const request = {
              account: { ...selectedAccount }
            };
            const result = await AccountService.update(request, token);
            if (result) {
              getAllAccounts(token);
            }
            toast.success('Düzenleme işlemi başarılı olarak tamamlanmıştır.', { autoClose: 2000 });
          } else {
            toast.error('Kullanıcı güncelleme işlemi başarısız.', { autoClose: 2000 });
          }
        } else {
          throw new Error("Düzenleme işlemi esnasında bir hata oluştu.");
        }
        handleClear();
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        alert('Düzenleme sırasında bir hata oluştu.');
      }
    } else {
      toast.error('Kullanıcı adı ve rol bilgisi zorunludur.', { autoClose: 2000 });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (event) => {
    setSelectedAccount(prev => ({ ...prev, isActive: event.target.value === "true" }));
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Kullanıcılar</h1>
      <hr className="border-t-2 border-gray-400 w-3/4 mx-auto mb-3" />
      <div className="overflow-x-auto">
        <AccountManagementSlider accounts={accounts} cardUpdateOnClick={cardUpdateOnClick} />
      </div>
      <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-3">Kullanıcı Bilgilerini Güncelle</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kullanıcı ID</label>
          <input type="text" name="id" value={selectedAccount.id} disabled className="w-full p-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kullanıcı Email</label>
          <input type="email" name="email" value={selectedAccount.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
          <input type="text" name="username" value={selectedAccount.username} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kullanıcı Rolü</label>
          <select name="role" value={selectedAccount.role} onChange={handleInputChange} className="w-full p-2 border rounded-md">
            <option value="ADMIN">Admin</option>
            <option value="PERSONEL">Personel</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kullanıcı Durumu</label>
          <select name="isActive" value={selectedAccount.isActive} onChange={handleStatusChange} className="w-full p-2 border rounded-md">
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>
        </div>
        <div className="mt-4 flex space-x-4">
          <button onClick={handleClear} className="w-full py-2 px-4 bg-gray-600 text-white rounded-md">Temizle</button>
          <button onClick={handleSave} className="w-full py-2 px-4 bg-green-600 text-white rounded-md">Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default AccountOperation;