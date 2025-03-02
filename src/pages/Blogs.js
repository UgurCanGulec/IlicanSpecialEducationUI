import React from 'react';
import Post from '../components/Post';

const Blogs = () => {
  return (
    <div className="relative bg-[url('/src/images/socials.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="py-40 text-center text-white px-4 relative">
        <h2 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">Etkinliklerimiz</h2>
      </div>
      <div className="max-w-7xl mx-auto relative">
        <Post />
      </div>
    </div>
  );
};

export default Blogs;
