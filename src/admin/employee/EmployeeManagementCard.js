import React from 'react';

const EmployeeManagementCard = ({ employee, onUpdate, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 m-2 w-96 bg-gray-50 shadow-md flex flex-col justify-between h-[500px]">
      <div className="mb-6 space-y-2 flex-1 overflow-auto">
        <p className="text-lg font-semibold">Personel Adı: {employee.nameSurname}</p>
        <p className="text-sm text-gray-600">Personel ID: {employee.id}</p>
        <p className="text-sm text-gray-600">Personel Ünvanı: {employee.title}</p>
        <p className="text-sm text-gray-600">Personel Resim URL: {employee.pictureUrl}</p>
        <p className="text-sm text-gray-600">Personel İşe Giriş Tarihi: {employee.hireDate}</p>
        <p className="text-sm text-gray-600">Personel Email: {employee.email}</p>

        <div className="text-sm text-gray-600">
          <p className="font-semibold">Personel Görev Açıklama:</p>
          <p className="mt-1 whitespace-normal break-words">{employee.description}</p>
        </div>
      </div>

      <div className="mt-auto flex justify-center space-x-4">
        <button
          onClick={() => onUpdate(employee.id)}
          className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
        >
          Güncelle
        </button>
        <button
          onClick={() => onDelete(employee.id)}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default EmployeeManagementCard;
