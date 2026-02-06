import React, { useState } from 'react';
import paperClip from '../images/paper-clip.png';

const EmployeeSlider = ({ employees }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(e.target.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    e.target.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(e.target.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startX;
    e.target.scrollLeft = scrollLeft - distance;
  };

  const handleTouchEnd = () => setIsDragging(false);

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-11/12 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-center text-gray-100 mb-8">
            Eğitim Kadromuz
          </h2>
        </div>

        <div
          className="overflow-x-auto py-8"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex space-x-8 py-4">
            {employees.map((employee, index) => {
              const isExpanded = expandedIndexes.includes(index);
              const shortDesc = employee.description.slice(0, 300) + '...';

              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-80 p-4 bg-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{
                    height: '500px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <img
                    src={paperClip}
                    alt="Raptiye"
                    className="absolute top-2 right-2 w-6 h-6"
                  />

                  <img
                    src={`${employee.pictureUrl}`}
                    alt={employee.nameSurname}
                    className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                  />

                  <div className="text-center px-2 h-64 flex flex-col">
                    <div className="text-lg font-semibold text-gray-800 mb-1">
                      {employee.nameSurname}
                    </div>
                    <div className="text-sm text-orange-500 mb-2">
                      {employee.title}
                    </div>
                    <div className="text-sm text-gray-600 overflow-y-auto mt-2 text-justify">
                      {isExpanded
                        ? employee.description
                        : shortDesc}
                    </div>
                    <button
                      className="mt-2 text-blue-500 text-sm hover:underline"
                      onClick={() => toggleExpanded(index)}
                    >
                      {isExpanded ? 'Kısalt' : 'Detay'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSlider;
