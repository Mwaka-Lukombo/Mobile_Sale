import { Loader } from 'lucide-react'
import React from 'react'

export const LoaderComponent = ({size}) => {
  return (
    <div className='flex items-center justify-center'>
        <Loader className={`size-${size} animate-spin`} />
    </div>
  )
}
