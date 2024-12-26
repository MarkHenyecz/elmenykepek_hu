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
        <div className={`bg-secondary p-4 flex flex-col ${isLoading ? 'skeleton' : ''}`} ref={ref} >
            {!hideCharacter ? 
            <Link href={`/karakter/${post?.character.id}`}>
                <div className='flex gap-4'>
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
                    <div className='flex flex-col justify-center gap-2'>
                        <div className='characterName text-2xl sm:text-3xl'>
                            <p>
                                {post?.character.name}
                            </p>
                        </div>
                        <div className='albumName text-2xl sm:text-3xl'>
                            <p>
                                {post?.title}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            : 
            <h1 className='text-5xl text-center mb-4'>
                {post?.title}
            </h1>}

            <div className='flex justify-center mt-4'>
                <div className={'w-[300px] sm:w-[550px] md:w-[700px] lg:w-[820px]'+(isLoading ? 'h-[250px] sm:h-[400px] md:h-[500px] lg:h-[500px] skeleton__child' : '')}>
                    <Gallery photos={images} onClick={(e) => setSelectedImage((e.target as HTMLImageElement).src)} />
                </div>
            </div>

            <div className='flex justify-between items-center gap-4 mt-4'>
                <div>
                    {!authStore.isLoggedIn ? 
                        <ToolTip message='Előbb jelentkezz be.'>
                            <HeartElem 
                                id={post?.id ?? 0}
                                defaultLikes={post?.likes}
                                defaultLiked={post?.isLiked}
                                type="post"
                                disabled={true} 
                            />
                        </ToolTip> : 
                        <HeartElem 
                        id={post?.id ?? 0}
                        defaultLikes={post?.likes}
                        defaultLiked={post?.isLiked}
                        type="post"
                        disabled={uploadedByUser || !authStore.isLoggedIn} 
                        />
                    }
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
