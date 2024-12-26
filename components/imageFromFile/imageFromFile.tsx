import Image from "next/image";
import { useEffect, useState } from "react"
import { getBase64 } from "../helpers/getBase64Helper";

interface Props {
    file: File
}

export default function ImageFromFile ({file}: Props) {
    const [image, setImage] = useState('')

    useEffect(() => {
        getBase64(file, setImage)
    }, [file])

    return <Image className="w-[300px] md:w-[400px]" src={image} alt={file.name} />

}