"use client";
import Image from 'next/image';
import '../../components/scss/heart.scss'
import { useState } from 'react';


export default function HeartElem() {
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <div className='heart'>
      <Image 
        src={`/icons/heart-icon${isLiked ? "-solid" : ""}.svg`}
        alt='Tetszik'
        width={50}
        height={50}
      />

      <p>
        231
      </p>
    </div>
  )
}
