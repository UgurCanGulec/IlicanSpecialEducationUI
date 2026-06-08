import React from 'react'
import { FaFacebook, FaInstagram, FaMapLocation, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='bg-gray-900'>
        <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
            <div className='grid lg:grid-cols-4'>
                <div className='grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-3'>
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Ilıcan Özel Eğitim</p>
                        <ul className='mt-2 space-y-2 '>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Hakkımızda</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Vizyon</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>İletişim</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Programlar</p>
                        <ul className='mt-2 space-y-2 '>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Özel Öğrenme Güçlüğü Destek Eğitim Programı</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Bedensel Engelliler Destek Eğitim Programı</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Yaygın Gelişimsel Bozukluklar Destek Eğitim Programı</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Zihinsel Engelli Bireyler Destek Eğitim Programı</a>
                            </li>
                        </ul>
                    </div>
              
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Bize Ulaşın</p>
                        <ul className='mt-2 space-y-2 '>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'><FaPhone className='inline mr-2 hover:text-orange-500' /> 0374 356 2484</a>
                            </li>
                            <li>
                                <a href="https://wa.me/+905357891985" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'><FaWhatsapp className='inline hover:text-orange-500 mr-2' />+90 535 789 19 85</a>
                            </li>
                            <li>
                                <a href='/' className='text-gray-500 transition-colors duration-300 hover:text-orange-500'><FaMapLocation className='inline hover:text-orange-500 mr-2' />TABAKLAR YAZIYAKA MAH. GÖKCESU CAD. NO: 104 İÇ KAPI NO: 1 MENGEN / BOLU</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row mt-5'>
                <p className='text-sm text-gray-500'>Developed by: Uğur Can Güleç</p>
                <p className='text-sm text-gray-500'>© Copyrights 2026 Ilıcan Özel Eğitim | Tüm Hakları Saklıdır.</p>
                <div className='flex items-center mt-4 space-x-4 sm:mt-0'>
                    <a href='' className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaTwitter className='h-6 w-6' /></a>
                    <a href='' className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaFacebook className='h-6 w-6' /></a>
                    <a href='' className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaInstagram className='h-6 w-6' /></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer