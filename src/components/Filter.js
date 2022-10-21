import React from 'react'

export default function Filter({filterHandler}) {
  return (
    <div className='filter'>
      <input onChange={e=>filterHandler(e)} className='filter__input' placeholder='Search...'/>
    </div>
  )
}
