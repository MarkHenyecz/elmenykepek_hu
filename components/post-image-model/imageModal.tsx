import Image from 'next/image';
import { GalleryItem } from '../post/post';
import { useState } from 'react';

interface Props {
    images: GalleryItem[]
    initialImage: string
    close: () => void
}

const ImageModal = ({ images, initialImage, close }: Props) => {
    const [selectedImage, setSelectedImage] = useState(initialImage)

    const getKey = () => {
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            
            if (selectedImage == element.src) {
                return index;
            }
        }

        return;
    }

    return (
        <div 
            className='flex flex-col gap-4 z-10 left-0 top-0 fixed w-[100vw] h-[100vh] bg-[#0000009a] justify-center items-center imageModal'
            onClick={(e) => (e.target as HTMLDivElement).className.includes('imageModal') ? close() : undefined}
        >
            <Image 
                src={selectedImage}
                alt={selectedImage}
                width={800}
                height={600}
            />

            <div className='flex items-center jusitfy-between gap-4 [&>img]:cursor-pointer'>
                <Image 
                    src={"/icons/arrow-left.svg"}
                    alt={"Vissza"}
                    width={30}
                    height={30}
                    onClick={() => {
                        const newKey = (getKey() ?? 0) - 1;

                        if(images[newKey])
                            setSelectedImage(images[newKey].src)
                    }}
                />
                {images.map(img => 
                    <Image 
                        key={img.src}
                        src={img.src}
                        alt={img.src}
                        height={100}
                        width={100}
                        className={selectedImage == img.src ? 'border-accent border-[3px]' : ''}
                        onClick={() => setSelectedImage(img.src)}
                    />
                )}
                <Image 
                    src={"/icons/arrow-right.svg"}
                    alt={"Előre"}
                    width={30}
                    height={30}
                    onClick={() => {
                        const newKey = (getKey() ?? 0) + 1;

                        if(images[newKey])
                            setSelectedImage(images[newKey].src)
                    }}
                />
            </div>
        </div>
    )
}

export default ImageModal;