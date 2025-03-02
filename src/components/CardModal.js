import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa6';

const CardModal = ({ post, onClose }) => {
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    if (!post) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose} 
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl h-4/5 overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-center mb-4">{post.title}</h2>
                    <img src={post.pictureUrl} alt={post.title} className="w-full max-h-96 object-cover rounded-lg mb-4" />
                    <div className="flex items-center text-gray-700 mb-2">
                        <FaUser className="mr-2" />
                        <span className="font-medium">{post.author}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Yayınlanma Tarihi: {post.createDate}</p>
                    <p className="text-gray-800">{post.content}</p>
                </div>
            </div>
        </div>
    );
};

export default CardModal;
