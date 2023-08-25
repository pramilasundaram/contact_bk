import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

export default function Paginations({ handleprevious, handlenext, page, pagecount, setPage }) {
  
  return (
    <div>
      {
        pagecount > 0 ? <div className='pagination d-flex justify-content-end mx-5'>
          <Pagination>
            <Pagination.Prev onClick={() => handleprevious()} />
            {
              Array(pagecount).fill(null).map((element, index) => {
                return (
                <>
                  <Pagination.Item active={page===index+1 ? true:false} onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
                </>
                )
              })
              
            }
            <Pagination.Next onClick={() => handlenext()} />
          </Pagination>
        </div> : ""
      }

    </div>
  )
 
}
