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
  })

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    const result = await EmployeeService.getAllEmployees();
    setEmployees(result.data.employees);
  };

  const cardUpdateOnClick = (id) => {
    const employee = employees.find(item => item.id === id)
    setSelectedEmployee(employee)
  }

  const cardDeleteOnClick = async (id) => {
    const confirmDelete = window.confirm('Seçilen personelin kaydını silmek istediğinize emin misiniz ?');
    if (confirmDelete) {
      const token = localStorage.getItem('token')
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      if (isAuthenticated && token) {
        const result = await EmployeeService.removeEmployeeById(id, token)
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
          getAllEmployees()
        }
      }
    }
  }

  const handleSave = async () => {
    if (validateBeforeEmployeeSave(selectedEmployee)) {
      try {
        const token = localStorage.getItem('token')
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (isAuthenticated && token) {
          if (selectedEmployee && selectedEmployee.id) {
            const request = {
              employee: {
                id: selectedEmployee.id,
                nameSurname: selectedEmployee.nameSurname,
                title: selectedEmployee.title,
                pictureUrl: selectedEmployee.pictureUrl,
                hireDate: selectedEmployee.hireDate,
                email: selectedEmployee.email,
                description: selectedEmployee.description
              }
            }
            const result = await EmployeeService.updateEmployee(request, token)
            if (result) {
              getAllEmployees()
            }
          } else {
            const request = {
              employee: {
                id: selectedEmployee.id,
                nameSurname: selectedEmployee.nameSurname,
                title: selectedEmployee.title,
                pictureUrl: selectedEmployee.pictureUrl,
                hireDate: selectedEmployee.hireDate,
                email: selectedEmployee.email,
                description: selectedEmployee.description
              }
            }
            const result = await EmployeeService.addEmployee(request, token)
            if (result) {
              getAllEmployees()
            }
          }
          toast.success('Kaydetme işlemi başarılı olarak tamamlanmıştır.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
          });
        } else {
          throw new Error("Düzenleme işlemi esnasında bir hata oluştu.");
        }
        alert('Düzenleme başarılı');
        getAllEmployees();
        handleClear()
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
    })
  }

  const handlePersonelNameOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePersonelTitleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePersonelPictureUrlOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePersonelEmailOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDescriptionOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            onChange={handlePersonelNameOnChange}
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
            onChange={handlePersonelTitleOnChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">
            Personel Resim URL
          </label>
          <input
            id="pictureUrl"
            name="pictureUrl"
            type="email"
            value={selectedEmployee.pictureUrl}
            onChange={handlePersonelPictureUrlOnChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
            Personel İşe Giriş Tarihi
          </label>
          <DatePicker
            selected={selectedEmployee.hireDate || new Date()}
            onChange={(date) => setSelectedEmployee(prev => ({ ...prev, hireDate: date }))}
            className=""
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
            onChange={handlePersonelEmailOnChange}
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
            onChange={handleDescriptionOnChange}
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
