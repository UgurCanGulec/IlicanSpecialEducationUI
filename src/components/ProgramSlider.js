import React, { useState } from 'react';

const ProgramSlider = ({ services }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});

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

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-11/12 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-center text-gray-100 mb-8">
            Hizmetler & Programlar
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
            {services.map((service, index) => {
              const isExpanded = expandedCards[index];
              const shouldShowButton = service.description.length > 200;
              const shortDescription = service.description.slice(0, 200);

              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-96 p-6 rounded-lg transition-transform transform bg-white hover:scale-105 hover:shadow-2xl duration-300"
                  style={{
                    boxShadow:
                      '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={`/images/${service.image}`}
                      alt={service.title}
                      className="w-full h-auto rounded-lg object-cover aspect-video"
                    />
                  </div>

                  <div className="bg-orange-500 h-1 w-25 mx-auto mb-5"></div>

                  <div className="text-center text-black">
                    <div className="text-xl font-semibold mb-2">
                      {service.title}
                    </div>
                    <p className="text-sm mb-2">
                      {isExpanded
                        ? service.description
                        : `${shortDescription}${shouldShowButton ? '...' : ''}`}
                    </p>
                    {shouldShowButton && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="mt-2 text-orange-600 font-semibold hover:underline focus:outline-none"
                      >
                        {isExpanded ? 'Küçült' : 'Detay'}
                      </button>
                    )}
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

export default ProgramSlider;
