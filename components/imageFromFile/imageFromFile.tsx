import { useEffect, useState } from "react"

interface Props {
    file: File
}

export default ({file}: Props) => {
    const [image, setImage] = useState('')

    const getBase64 = () => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          if(typeof reader.result == "string")
            setImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        getBase64()
    }, [file])

    return <img src={image} alt={file.name} />

}