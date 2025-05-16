import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex gap-x-3'>
      <Link href="./image">imgage</Link>
      <Link href="./videos">video</Link>
      <Link href="./indexs">index</Link>
    </div>
  )
}

export default page
