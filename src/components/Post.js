import React, { useEffect, useState } from 'react'
import Card from './Card'
import Pagination from './Pagination'
import Sidebar from './Sidebar'
import PostService from '../api/PostService'
import { useAppContext } from '../context/AppContext'

const Post = () => {

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  const {
    setLoading,
  } = useAppContext()

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)
    try {
      const result = await PostService.getAllPosts()
      setPosts(result.data.posts)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-center text-gray-100 mb-8">
        Etkinlikler & Makaleler
      </h2>
      <div className='flex flex-col lg:flex-row gap-12'>
        <Card
          posts={posts}
          currentPage={currentPage}
          selectedCategory={null}
          pageSize={pageSize}
        />
        <div>
          {posts.length >= 12 && currentPage === 1 && (
            <Sidebar />
          )}
        </div>
      </div>
      <div>
        <Pagination onPageChange={handlePageChange} currentPage={currentPage} posts={posts} pageSize={pageSize} />
      </div>
    </div>
  )
}

export default Post