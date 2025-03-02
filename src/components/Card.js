import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import CardModal from './CardModal';

const Card = ({ posts, currentPage, pageSize }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="grid mb-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="p-5 bg-white shadow-lg rounded cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gray-100"
            onClick={() => setSelectedPost(post)}
          >
            <div>
              <img src={post.pictureUrl} alt={post.title} className="w-full rounded" />
            </div>
            <h3 className="mt-4 mb-2 font-bold text-black hover:text-orange-500 cursor-pointer">
              {post.title}
            </h3>
            <p className="mb-2 text-black flex items-center">
              <FaUser className="mr-2" /> {post.author}
            </p>
            <p className="text-sm text-gray-500">Yayınlanma Tarihi: {post.createDate}</p>
          </div>
        ))}
      </div>

      {selectedPost && <CardModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default Card;
