import React, { useEffect, useState } from 'react'
import PostManagementSlider from './PostManagementSlider'
import PostService from '../../api/PostService'
import { ToastContainer, toast } from 'react-toastify'
import { validateBeforePostSave } from '../../util/ApplicationUtil'

const PostOperation = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState({
    id: '',
    title: '',
    content: '',
    author: '',
    createDate: '',
    pictureUrl: '',
    status: ''
  })

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    const result = await PostService.getAllPosts()
    setPosts(result.data.posts)
  }

  const cardUpdateOnClick = (id) => {
    const post = posts.find(item => item.id === id)
    setSelectedPost(post)
  }

  const cardDeleteOnClick = async (id) => {
    const confirmDelete = window.confirm('Seçilen gönderiyi silmek istediğinize emin misiniz ?');
    if (confirmDelete) {
      const token = localStorage.getItem('token')
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      if (isAuthenticated && token) {
        const result = await PostService.removePostById(id, token)
        if (result) {
          toast.success('Seçilen gönderi başarılı olarak kaldırılmıştır.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
          });
          getAllPosts()
        }
      }
    }
  }


  const handleSave = async () => {
    if (validateBeforePostSave(selectedPost)) {
      try {
        const token = localStorage.getItem('token')
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (isAuthenticated && token) {
          if (selectedPost && selectedPost.id) {
            const request = {
              post: {
                id: selectedPost.id,
                title: selectedPost.title,
                content: selectedPost.content,
                author: selectedPost.author,
                pictureUrl: selectedPost.pictureUrl,
                status: 'ACTIVE'
              }
            }
            const result = await PostService.updatePost(request, token)
            if (result) {
              getAllPosts()
            }
          } else {
            const request = {
              post: {
                id: selectedPost.id,
                title: selectedPost.title,
                content: selectedPost.content,
                author: selectedPost.author,
                pictureUrl: selectedPost.pictureUrl,
                status: 'ACTIVE'
              }
            }
            const result = await PostService.addPost(request, token)
            if (result) {
              getAllPosts()
            }
          }
          toast.success('Kaydetme işlemi başarılı olarak tamamlanmıştır.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
          });
        } else {
          throw new Error("Düzenleme işlemi esnasında bir hata oluştu.");
        }
        alert('Düzenleme başarılı');
        getAllPosts();
        handleClear()
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        alert('Güncelleme sırasında bir hata oluştu.');
      }
    } else {
      toast.error('Lütfen zorunlu alanları doldurunuz.', { autoClose: 2000 });
    }
  };

  const handlePostTitleOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePostContentOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePostPictureUrlOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePostAuthorOnChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleClear = () => {
    setSelectedPost({
      id: '',
      title: '',
      content: '',
      author: '',
      createDate: '',
      pictureUrl: '',
      status: ''
    })
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <div className="sticky top-0 bg-white z-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Gönderiler
        </h1>
        <hr className="border-t-2 border-gray-400 w-3/4 mx-auto mb-3" />
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <PostManagementSlider
          posts={posts}
          cardUpdateOnClick={cardUpdateOnClick}
          cardDeleteOnClick={cardDeleteOnClick}
        />
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-3">Gönderi Düzenleme</h2>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Gönderi ID
          </label>
          <input
            id="id"
            name="id"
            type="text"
            disabled={true}
            value={selectedPost.id}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">
            Gönderi Başlığı
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={selectedPost.title}
            onChange={handlePostTitleOnChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postAuthor" className="block text-sm font-medium text-gray-700">
            Yazar
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={selectedPost.author}
            onChange={handlePostAuthorOnChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Gönderi Resim URL
          </label>
          <input
            id="pictureUrl"
            name="pictureUrl"
            type="text"
            value={selectedPost.pictureUrl}
            onChange={handlePostPictureUrlOnChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Gönderi İçeriği
          </label>
          <textarea
            id="content"
            name="content"
            value={selectedPost.content}
            onChange={handlePostContentOnChange}
            rows="8"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none"
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            onClick={handleClear}
          >
            Temizle
          </button>
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostOperation
