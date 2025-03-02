import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const Pagination = ({onPageChange, currentPage, posts, pageSize}) => {
    
    const totalPages = Math.ceil(posts.length / pageSize)

    const renderPaginationLinks = () => {
        return Array.from({length: totalPages}, (_, i) => i + 1).map((pageNumber) => (
            <li className={pageNumber === currentPage ? "activerPagination" : ""} key={pageNumber}>
                <a href='#' onClick={() => onPageChange(pageNumber)}>{pageNumber}</a>
            </li>
        )
        )
    }

  return (
    <div>
        <ul className='pagination my-8 flex-wrap gap-4'>
        <li>
            <button className='mb-7' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}><FaArrowLeft className='mt-2'/></button>
        </li>
        <div className='flex gap-1 mb-5'>{renderPaginationLinks()}</div>
        <li>
            <button className='mb-7' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaArrowRight className='mt-2' /></button>
        </li>
    </ul>
    </div>
  )
}

export default Pagination