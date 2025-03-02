import React from 'react';
import center from '../images/center.jpg';
import center2 from '../images/center2.jpg';
import center3 from '../images/center3.jpg';
import center4 from '../images/center4.jpg';
import bgImage from '../images/about-bg.jpg';

const About = () => {
  const galleryImages = [center, center2, center3, center4];

  return (
    <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative max-w-7xl mx-auto py-16 sm:px-4 md:px-6 lg:px-8 text-white">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-wide mb-4">
            Biz Kimiz?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ilıcan Özel Eğitim & Rehabilitasyon Merkezi, özel gereksinimli bireylerin eğitim hayatlarına
            destek olmak ve onların topluma kazandırılmasını sağlamak amacıyla kurulmuştur. Uzman eğitimcilerimizle,
            bireysel farklılıkları gözeterek, sevgi ve bilim ışığında eğitim sunuyoruz.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-40 sm:h-48 md:h-52 object-cover transform transition duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 lg:mt-0 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-wide mb-6">
              Neden Ilıcan Eğitim?
            </h2>
            <p className="text-lg font-semibold mb-4 text-yellow-400">GELECEĞE UMUTLA BAKMAK İÇİN</p>
            <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
              Geleceğimiz "Çocuklarımızın" gelişimine katkıda bulunmak için Ilıcan Özel Eğitim & Rehabilitasyon
              Merkezi, siz velilerimiz ile birlikte en iyi yol haritasını belirlemektedir.
            </p>
            <ul className="text-base sm:text-lg space-y-3">
              <li className="border-l-4 border-yellow-400 pl-3 font-medium transition-all duration-300 hover:text-yellow-300">
                YAYGIN GELİŞİMSEL BOZUKLUK
              </li>
              <li className="border-l-4 border-yellow-400 pl-3 font-medium transition-all duration-300 hover:text-yellow-300">
                ÖZEL ÖĞRENME GÜÇLÜĞÜ
              </li>
              <li className="border-l-4 border-yellow-400 pl-3 font-medium transition-all duration-300 hover:text-yellow-300">
                ZİHİNSEL ENGELLİLER DESTEK EĞİTİMİ
              </li>
              <li className="border-l-4 border-yellow-400 pl-3 font-medium transition-all duration-300 hover:text-yellow-300">
                BEDENSEL YETERSİZLİK EĞİTİMİ
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
