import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import PostService from '../api/PostService'
import CardModal from '../components/CardModal'

const Sidebar = () => {

    const [popularPosts, setPopularPosts] = useState([])
    const [selectedPopularPost, setSelectedPopularPost] = useState(null)

    useEffect(() => {
        getPopularPosts()
    }, [])

    const getPopularPosts = async () => {
        const result = await PostService.getAllPosts()
        setPopularPosts(result.data.posts)
    }

    return (
        <div>
            <div>
                <h5 className='text-2xl font-semibold px-4 mb-4 mt-3 text-white'>Popüler Makaleler</h5>
                <div>
                    {
                        popularPosts.map(post => (
                            <div key={post.id} onClick={() => setSelectedPopularPost(post)} className='my-5 border-b-2'>
                                <h4 className='font-medium mb-2 text-white'>{post.title}</h4>
                                <div className='text-base pb-2 inline-flex items-center py-1'>
                                    <span className='text-white hover:text-orange-500'>Göz Atın</span>
                                    <FaArrowRight className='mt-1 ml-2 text-white hover:text-orange-500' />
                                </div>
                            </div>
                        ))
                    }
                    {selectedPopularPost && <CardModal post={selectedPopularPost} onClose={() => setSelectedPopularPost(null)} />}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
