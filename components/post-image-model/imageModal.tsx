import Image from 'next/image';
import { GalleryItem } from '../post/post';
import "../scss/characterModal.scss"
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
            className='imageModal' 
            onClick={(e) => (e.target as HTMLDivElement).className == 'imageModal' ? close() : undefined}
        >
            <Image 
                src={selectedImage}
                alt={selectedImage}
                width={800}
                height={600}
            />

            <div className='imageModal__navigation'>
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
                        className={selectedImage == img.src ? 'selected' : ''}
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