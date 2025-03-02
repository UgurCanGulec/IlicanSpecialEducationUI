import React, { useState } from 'react';
import paperClip from '../images/paper-clip.png';

const EmployeeSlider = ({ employees }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  const handleTouchEnd = () => {
    setIsDragging(false);
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
            {employees.map((employee, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-80 p-6 bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{
                  marginTop: '16px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 6px rgba(255, 140, 0, 0.3), 0 1px 3px rgba(255, 140, 0, 0.2)',
                  borderRadius: '20px',
                }}
              >
                <img
                  src={paperClip}
                  alt="Raptiye"
                  className="absolute top-2 right-2 w-8 h-8"
                />

                <img
                  src={`/images/${employee.pictureUrl}`}
                  alt={employee.nameSurname}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                />
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-800 mb-2">{employee.nameSurname}</div>
                  <div className="text-md text-gray-400 mb-2">{employee.title}</div>
                  <p className="text-sm text-gray-500">{employee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSlider;
