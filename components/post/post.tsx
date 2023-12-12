"use client";
import Gallery from 'react-photo-gallery';
import '../../components/scss/post.scss'
import AvatarElem from '../avatar/avatar';
import HeartElem from '../heart/heart';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Post } from '../interfaces/post.interface';
import useOnScreen from '../providers/onScreenProvider';
import { InView, useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useAuthStore } from '../stores/authStore';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ImageModal from '../post-image-model/imageModal';
import ToolTip from '../tooltip';

interface Props {
    post?: Post
    isLoading?: boolean 
    hideCharacter?: boolean 
    onVisible?: () => void
}

export interface GalleryItem {
    src: string;
    width: number;
    height: number;
}

export default function PostElem({ isLoading = false, hideCharacter = false, post, onVisible }: Props) {
    const [images, setImages] = useState<GalleryItem[]>([])
    const [copied, setCopied] = useState(false)
    const { ref, inView } = useInView({ triggerOnce: true });
    const authStore = useAuthStore();
    const uploadedByUser = post?.character.user.id == authStore.userId;
    const bbCode = useMemo(() => {
        let text = "";

        post?.images.forEach(img => {
            text += `[IMG]${img.image.url}[/IMG]\n`
        });

        return text;
    }, [post?.images])

    useEffect(() => {
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

    const [selectedImage, setSelectedImage] = useState<string>('')

    
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
                        width={120} 
                        iconHeight={post?.character.profile_picture?.url ? 120 : undefined}
                        iconWidth={post?.character.profile_picture?.url ? 120 : undefined}
                        />
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
                    <Gallery photos={images} onClick={(e) => setSelectedImage((e.target as HTMLImageElement).src)} />
                </div>
            </div>

            <div className='post__likeSection'>
                <div className='post__likeSection__likes'>
                    <HeartElem 
                    id={post?.id ?? 0}
                    defaultLikes={post?.likes}
                    defaultLiked={post?.isLiked}
                    type="post"
                    disabled={uploadedByUser || !authStore.isLoggedIn} 
                    />
                </div>

                {uploadedByUser ?
                <ToolTip 
                    message={copied ? 'Kimásolva' : 'A BB kód másolásához kattints ide'}
                >
                    <CopyToClipboard
                    text={bbCode}
                    onCopy={() => setCopied(true)}
                    >
                        <Image
                            style={{cursor: 'pointer'}}
                            src={copied ? '/icons/clipboard.svg' : `/icons/file-code.svg`}
                            alt='BB kód másolása'
                            width={30}
                            height={30}
                        />
                    </CopyToClipboard>
                </ToolTip>
                : null}
            </div>

            {selectedImage != "" ? <ImageModal images={images} initialImage={selectedImage} close={() => setSelectedImage('')} /> : null}
        </div>
    )
}
