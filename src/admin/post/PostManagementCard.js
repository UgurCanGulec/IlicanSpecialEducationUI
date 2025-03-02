import React from "react";
import { FaUser, FaClock } from "react-icons/fa";

const PostManagementCard = ({ post, onUpdate, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 m-2 w-96 bg-gray-50 shadow-md flex flex-col justify-between h-[500px]">
      <div className="mb-6 space-y-2 flex-1 overflow-auto">
        <img src={post.pictureUrl} alt={post.title} className="w-full h-48 object-cover" />
        <p className="text-md font-bold text-gray-800 break-words whitespace-normal w-full">
          {post.title}
        </p>
        <div className="flex items-center text-sm text-gray-600">
          <FaUser className="mr-2 text-gray-500" />
          <p>{post.author}</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="mr-2 text-gray-500" />
          <p>{post.createDate}</p>
        </div>
      </div>
      <div className="mt-auto flex justify-center space-x-4">
        <button
          onClick={() => onUpdate(post.id)}
          className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
        >
          Güncelle
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default PostManagementCard;
