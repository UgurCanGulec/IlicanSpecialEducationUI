import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationService from '../api/AuthenticationService'; 
import { useAppContext } from '../context/AppContext';

const Modal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {
    setLoading
  } = useAppContext()

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const result = await AuthenticationService.login(username, password);
      if (result.data.authenticated && result.data.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('role', result.data.role);
        localStorage.setItem('isAuthenticated', result.data.authenticated);
        toast.success('Giriş başarılı! Yönlendiriliyorsunuz...', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setLoading(false)
        toast.error('Giriş başarısız! Lütfen bilgilerinizi kontrol ediniz.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (error) {
      setLoading(false)
      toast.error('Giriş işlemi başarısız. Lütfen kullanıcı adı ve şifrenizi giriniz.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
        <div className='relative bg-gray-800 text-center p-5 h-96 lg:w-[500px] rounded shadow-md'>
          <button onClick={onClose} className='absolute top-3 right-3 text-gray-400 hover:text-white'>
            &times;
          </button>
          <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>Oturum Açın</h2>
          <form className='px-4 mt-10' onSubmit={handleFormOnSubmit}>
            <div className='mb-5'>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Kullanıcı adı giriniz'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]
                outline-none focus:border-[#6a64f1] focus:shadow-md'
                autoComplete='username'
              />
            </div>
            <div className='mb-5'>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Parolanızı giriniz'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280]
                outline-none focus:border-[#6a64f1] focus:shadow-md'
                autoComplete='current-password'
              />
            </div>
            <div className='flex justify-end'>
              <button type='submit' className='hover:shadow-md rounded-md bg-green-700 hover:bg-orange-600 py-3 px-8 text-base font-semibold text-white outline-none'>
                Giriş
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
