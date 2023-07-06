"use client";
import Gallery from 'react-photo-gallery';
import '../../components/scss/post.scss'
import AvatarElem from '../avatar/avatar';
import HeartElem from '../heart/heart';
import { useState } from 'react';


export default function PostElem() {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([
        {src: 'https://henyeczmark.hu/seemta/Samuel_White/ujsagiro1/1.png', width: 800, height: 600},
        {src: 'https://henyeczmark.hu/seemta/Samuel_White/ujsagiro1/2.png', width: 800, height: 600},
        {src: 'https://henyeczmark.hu/seemta/Samuel_White/ujsagiro1/3.png', width: 800, height: 600},
        {src: 'https://henyeczmark.hu/seemta/Samuel_White/ujsagiro1/4.png', width: 800, height: 600},
    ])


    return (
        <div className={`post ${isLoading ? 'skeleton' : ''}`}>
            <div className='post__userInfo'>
                <div className='avatarWrapper'>
                    <AvatarElem height={120} width={120} />
                </div>
                <div className='characterName'>
                    <p>
                        Leroy Rowland
                    </p>
                </div>
                <div className='albumName'>
                    <p>
                        Drug dealin' vol 1
                    </p>
                </div>
            </div>

            <div className='post__imagesWrapper'>
                <div className='post__imagesWrapper__images'>
                    <Gallery photos={images} />
                </div>
            </div>

            <div className='post__likeSection'>
                <div className='post__likeSection__likes'>
                    <HeartElem />
                </div>
            </div>
        </div>
    )
}
