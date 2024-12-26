"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { likeService } from '../api/likeService';
import LoaderElem from '../loader/loader';

interface Props {
  id: number
  type: "post"
  disabled?: boolean
  defaultLikes?: number
  defaultLiked?: boolean
}

export default function HeartElem({ id, type, disabled = false, defaultLikes, defaultLiked }: Props) {
  const [isLiked, setIsLiked] = useState(defaultLiked ?? false)
  const [likes, setLikes] = useState(defaultLikes)
  const [isLoading, setIsLoading] = useState(true)
  
  const likePost = async () => {
    setIsLoading(true)

    try {
      await likeService.postLike(id, getType(type))
      await getLikeData()
    } catch {}

    setIsLoading(false)
  }

  const getType = (type: string) => {
    switch (type) {
      case "post":
        return "App\\Models\\Post";
      default:
        break;
    }

    return "";
  }

  useEffect(() => {
    const getLikeData = async () => {
      if(type && id) {
        const data = await likeService.getLikes(id, getType(type))
  
        setIsLiked(data.data.liked)
        setLikes(data.data.likes)
        setIsLoading(false)
      }
    }

    if(defaultLikes == null)
      getLikeData()
    else
      setIsLoading(false)
  }, [defaultLikes, type, id])

  if(isLoading) {
    return (
      <div className='heart min-w-[130px]'>
        <LoaderElem />
      </div>
    )
  }

  return (
    <div 
      className='flex items-center gap-4 min-w-[130px]'
      style={disabled ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}
      onClick={!disabled ? () => likePost() : undefined}
    >
      <Image 
        src={`/icons/heart-icon${isLiked ? "-solid" : ""}.svg`}
        alt='Tetszik'
        width={50}
        height={50}
      />

      <p className='text-3xl'>
        {likes}
      </p>
    </div>
  )
}
