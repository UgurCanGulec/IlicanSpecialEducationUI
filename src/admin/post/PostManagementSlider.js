import React from 'react'
import PostManagementCard from './PostManagementCard'

const PostManagementSlider = ({ posts, cardDeleteOnClick, cardUpdateOnClick }) => {
  return (
    <div className="overflow-x-auto py-4">
    <div className="flex">
      {posts.map(post => (
        <PostManagementCard key={post.id} post={post} onUpdate={cardUpdateOnClick} onDelete={cardDeleteOnClick} />
      ))}
    </div>
  </div>
  )
}

export default PostManagementSlider