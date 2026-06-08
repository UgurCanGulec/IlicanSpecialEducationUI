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

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const defaultCover = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop"

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

    setPreviewUrl(post.pictureUrl ? post.pictureUrl : defaultCover)
    setSelectedFile(null)
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (validateBeforePostSave(selectedPost)) {
      try {
        const token = localStorage.getItem('token')
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (isAuthenticated && token) {

          const formData = new FormData()

          if (selectedFile) {
            formData.append("file", selectedFile)
          }

          if (selectedPost.id) {
            formData.append("post.id", selectedPost.id)
          }
          formData.append("post.title", selectedPost.title)
          formData.append("post.content", selectedPost.content)
          formData.append("post.author", selectedPost.author)
          formData.append("post.status", 'ACTIVE')

          if (!selectedFile && selectedPost.pictureUrl) {
            formData.append("post.pictureUrl", selectedPost.pictureUrl)
          }

          let result;
          if (selectedPost && selectedPost.id) {
            result = await PostService.updatePost(formData, token)
          } else {
            result = await PostService.addPost(formData, token)
          }

          if (result) {
            toast.success('Kaydetme işlemi başarılı olarak tamamlanmıştır.', {
              position: 'top-center',
              autoClose: 2000,
              theme: 'colored',
            })
            getAllPosts()
            handleClear()
          }
        } else {
          throw new Error("Düzenleme işlemi esnasında bir hata oluştu.");
        }
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        alert('Güncelleme sırasında bir hata oluştu.');
      }
    } else {
      toast.error('Lütfen zorunlu alanları doldurunuz.', { autoClose: 2000 });
    }
  };

  const handleInputChange = (event) => {
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
    setSelectedFile(null)
    setPreviewUrl('')

    const fileInput = document.getElementById('pictureFile')
    if (fileInput) fileInput.value = ''
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
          <h2 className="text-xl font-semibold mb-3">
            {selectedPost.id ? 'Gönderi Düzenleme' : 'Yeni Gönderi Ekle'}
          </h2>

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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Gönderi Başlığı
            </label>
            <input
                id="title"
                name="title"
                type="text"
                value={selectedPost.title}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Yazar
            </label>
            <input
                id="author"
                name="author"
                type="text"
                value={selectedPost.author}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4 flex items-center space-x-6">
            <div className="flex-1">
              <label htmlFor="pictureFile" className="block text-sm font-medium text-gray-700">
                Gönderi Görseli
              </label>
              <input
                  id="pictureFile"
                  name="pictureFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
            </div>

            {previewUrl && (
                <div className="flex flex-col items-center pt-5">
                  <span className="text-xs text-gray-500 mb-1">Kapak Önizleme</span>
                  <img
                      src={previewUrl}
                      alt="Gönderi Görseli Önizleme"
                      className="h-20 w-32 object-cover rounded-lg border-2 border-green-500 shadow-md"
                      onError={(e) => {
                        e.target.src = defaultCover;
                      }}
                  />
                </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Gönderi İçeriği
            </label>
            <textarea
                id="content"
                name="content"
                value={selectedPost.content}
                onChange={handleInputChange}
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
              {selectedPost.id ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
  )
}

export default PostOperation