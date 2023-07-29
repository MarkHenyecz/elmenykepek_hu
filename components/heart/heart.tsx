"use client";
import Image from 'next/image';
import '../../components/scss/heart.scss'
import { useEffect, useState } from 'react';

interface Props {
  id: number | string
  type: "post"
  disabled?: boolean
}

export default function HeartElem({ id, type, disabled = false }: Props) {
  const [isLiked, setIsLiked] = useState(false)
  
  useEffect(() => {

  }, [type, id])

  return (
    <div 
      className='heart'
      style={disabled ? {cursor: 'not-allowed'} : {}}
    >
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
