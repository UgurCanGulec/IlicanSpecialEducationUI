import React from 'react';

const AccountManagementCard = ({ account, onUpdate }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-6 m-2 w-96 bg-gray-50 shadow-md">
            <div className="mb-6 space-y-2">
                <p className="text-lg font-semibold">Kullanıcı Adı: {account.username}</p>
                <p className="text-sm text-gray-600">Kullanıcı ID: {account.id}</p>
                <p className="text-sm text-gray-600">Kullanıcı Email Adresi: {account.email}</p>
                <p className="text-sm text-gray-600">Kullanıcı Rolü: {account.role}</p>
                <p className="text-sm text-gray-600">Kullanıcı Statüsü : {account.isActive ? 'Aktif' : 'Pasif'}</p>
            </div>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => onUpdate(account.id)}
                    className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
                >
                    Güncelle
                </button>
            </div>
        </div>
    );
};

export default AccountManagementCard;
