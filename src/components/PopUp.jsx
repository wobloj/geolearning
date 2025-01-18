import React from 'react'

export default function PopUp({children}) {
  return (
    <div className='my-14 border-[1px] border-red-400 rounded-md w-96 px-5 py-2 text-center '>
        {children}
    </div>
  )
}
