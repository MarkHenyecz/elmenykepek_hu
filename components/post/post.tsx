"use client";
import Gallery from 'react-photo-gallery';
import '../../components/scss/post.scss'
import AvatarElem from '../avatar/avatar';
import HeartElem from '../heart/heart';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Post } from '../interfaces/post.interface';
import useOnScreen from '../providers/onScreenProvider';
import { InView, useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface Props {
    post?: Post
    isLoading?: boolean 
    hideCharacter?: boolean 
    onVisible?: () => void
}

interface GalleryItem {
    src: string;
    width: number;
    height: number;
}

export default function PostElem({ isLoading = false, hideCharacter = false, post, onVisible }: Props) {
    const [images, setImages] = useState<GalleryItem[]>([])
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        console.log(post);
        
        setImages(post?.images ? post?.images.map(item => {
            return {
                src: item.image.url,
                width: 800,
                height: 600
            }
        }) : [])
    }, [post])

    useEffect(() => {
        if(inView && onVisible)
            onVisible();
    }, [inView])

    
    return (
        <div className={`post ${isLoading ? 'skeleton' : ''}`} ref={ref} >
            {!hideCharacter ? 
            <Link href={`/karakter/${post?.character.id}`}>
                <div className='post__userInfo'>
                    <div className='avatarWrapper'>
                        <AvatarElem 
                        icon={post?.character.profile_picture?.url}
                        centerIcon={typeof post?.character.profile_picture?.url == "string"}
                        height={120} 
                        width={120} />
                    </div>
                    <div className='characterName'>
                        <p>
                            {post?.character.name}
                        </p>
                    </div>
                    <div className='albumName'>
                        <p>
                            {post?.title}
                        </p>
                    </div>
                </div>
            </Link>
            : 
            <h1>
                {post?.title}
            </h1>}

            <div className='post__imagesWrapper'>
                <div className='post__imagesWrapper__images'>
                    <Gallery photos={images} />
                </div>
            </div>

            <div className='post__likeSection'>
                <div className='post__likeSection__likes'>
                    {/* <HeartElem /> */}
                </div>
            </div>
        </div>
    )
}
