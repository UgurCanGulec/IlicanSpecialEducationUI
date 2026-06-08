import React, { useEffect, useState } from 'react';
import EmployeeService from '../../api/EmployeeService';
import EmployeeManagementSlider from './EmployeeManagementSlider';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import { validateBeforeEmployeeSave } from '../../util/ApplicationUtil';

const EmployeeOperation = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: '',
    nameSurname: '',
    title: '',
    pictureUrl: '',
    hireDate: '',
    email: '',
    description: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    const result = await EmployeeService.getAllEmployees();
    setEmployees(result.data.employees);
  };

  const cardUpdateOnClick = (id) => {
    const employee = employees.find(item => item.id === id);
    setSelectedEmployee(employee);
    setPreviewUrl(employee.pictureUrl);
    setSelectedFile(null);
  };

  const cardDeleteOnClick = async (id) => {
    const confirmDelete = window.confirm('Seçilen personelin kaydını silmek istediğinize emin misiniz ?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated && token) {
        const result = await EmployeeService.removeEmployeeById(id, token);
        if (result) {
          toast.success('Seçilen personelin kaydı başarılı olarak kaldırılmıştır.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
          });
          getAllEmployees();
        }
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (validateBeforeEmployeeSave(selectedEmployee)) {
      try {
        const token = localStorage.getItem('token');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated && token) {

          const formData = new FormData();

          if (selectedFile) {
            formData.append("file", selectedFile);
          }

          if (selectedEmployee.id) {
            formData.append("employee.id", selectedEmployee.id);
          }
          formData.append("employee.nameSurname", selectedEmployee.nameSurname);
          formData.append("employee.title", selectedEmployee.title);
          formData.append("employee.hireDate", selectedEmployee.hireDate);
          formData.append("employee.email", selectedEmployee.email);
          formData.append("employee.description", selectedEmployee.description);

          if (!selectedFile && selectedEmployee.pictureUrl) {
            formData.append("employee.pictureUrl", selectedEmployee.pictureUrl);
          }

          let result;
          if (selectedEmployee && selectedEmployee.id) {
            result = await EmployeeService.updateEmployee(formData, token);
          } else {
            result = await EmployeeService.addEmployee(formData, token);
          }

          if (result) {
            toast.success('Kaydetme işlemi başarılı olarak tamamlanmıştır.', {
              position: 'top-center',
              autoClose: 2000,
              theme: 'colored',
            });
            getAllEmployees();
            handleClear();
          }
        } else {
          throw new Error("Düzenleme işlemi esnasında bir hata oluştu.");
        }
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        alert('Güncelleme sırasında bir hata oluştu.');
      }
    } else {
      toast.error('Lütfen zorunlu alanları doldurunuz.', { autoClose: 2000 });
    }
  };

  const handleClear = () => {
    setSelectedEmployee({
      id: '',
      nameSurname: '',
      title: '',
      pictureUrl: '',
      hireDate: null,
      email: '',
      description: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
    // Input elemanını DOM üzerinden de sıfırlamak için (isteğe bağlı)
    const fileInput = document.getElementById('pictureFile');
    if (fileInput) fileInput.value = '';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
      <div className="container mx-auto p-6">
        <ToastContainer />
        <div className="sticky top-0 bg-white z-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Personeller
          </h1>
          <hr className="border-t-2 border-gray-400 w-3/4 mx-auto mb-3" />
        </div>

        <div className="overflow-x-auto whitespace-nowrap">
          <EmployeeManagementSlider
              employees={employees}
              cardUpdateOnClick={cardUpdateOnClick}
              cardDeleteOnClick={cardDeleteOnClick}
          />
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-3">Personel Bilgilerini Güncelle</h2>

          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Personel ID
            </label>
            <input
                id="id"
                name="id"
                type="text"
                disabled={true}
                value={selectedEmployee.id}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nameSurname" className="block text-sm font-medium text-gray-700">
              Personel Adı
            </label>
            <input
                id="nameSurname"
                name="nameSurname"
                type="text"
                value={selectedEmployee.nameSurname}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Personel Ünvanı
            </label>
            <input
                id="title"
                name="title"
                type="text"
                value={selectedEmployee.title}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pictureFile" className="block text-sm font-medium text-gray-700">
              Personel Resmi Seç
            </label>
            <input
                id="pictureFile"
                name="pictureFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {previewUrl && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Resim Önizleme:</p>
                  <img
                      src={previewUrl}
                      alt="Önizleme"
                      className="h-24 w-24 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
              Personel İşe Giriş Tarihi
            </label>
            <DatePicker
                selected={selectedEmployee.hireDate ? new Date(selectedEmployee.hireDate) : null}
                onChange={(date) => setSelectedEmployee(prev => ({ ...prev, hireDate: date }))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Personel Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                value={selectedEmployee.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Personel Görev Açıklaması
            </label>
            <textarea
                id="description"
                name="description"
                value={selectedEmployee.description}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4 flex space-x-4">
            <button
                onClick={handleClear}
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Temizle
            </button>
            <button
                onClick={handleSave}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
  );
};

export default EmployeeOperation;