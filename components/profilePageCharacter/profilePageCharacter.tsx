"use client";
import { useEffect, useRef, useState } from 'react';
import '../../components/scss/profile-character.scss'
import AvatarElem from '../avatar/avatar';
import LoaderElem from '../loader/loader';
import { fileService } from '../api/fileService';
import { characterService } from '../api/characterService';

interface Props {
    inEditorMode: boolean
    close?: () => void
}

export default function ProfilePageCharacterElem({ close, inEditorMode = false }: Props) {
    const [newName, setNewName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File>();
    const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const isFileSet = file && typeof fileData == "string";

    const getBase64 = () => {
        if(!file) return;

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setFileData(reader.result)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
    }

    useEffect(() => {
        getBase64()
    }, [file])

    const handleSave = async () => {
        if(!file || newName == "") return;

        setIsLoading(true)

        try {
            const dbFile = await fileService.uploadFile(file);
            await characterService.createCharacter(newName, dbFile.data.id)
            
            if(close)
                close();
        } catch {}

        setIsLoading(false)
    }

    return (
        <div className='characterElem'>
            {inEditorMode ?
            <>
                <AvatarElem 
                    centerIcon={!isFileSet}
                    width={150} 
                    height={150} 
                    iconWidht={isFileSet ? 150 : 80} 
                    iconHeight={isFileSet ? 150 : 80} 
                    icon={isFileSet ? fileData : '/icons/upload-icon.svg'} 
                    onClick={() => fileRef.current?.click()}
                />
                <input type="file" ref={fileRef} hidden onChange={(e) => setFile(e.target.files ? e.target.files[0] : undefined)} accept='.png,.jpg,.jpeg,.gif' />
                <input type="text" placeholder='Karakter neve' value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button onClick={!isLoading ? () => handleSave() : undefined}>
                    {!isLoading ? 'Mentés' : <LoaderElem />}
                </button>
            </>
            : 
            <>
                <AvatarElem width={150} height={150} />
                <h1>Gino Rivers</h1>
                <h2>Feltöltések:</h2>
                <p>Drug Dealin’ vol 1 - ma</p>
                <p>NNI baromkodások vol 8999 - tegnap</p>
                <p>NNI baromkodások vol 8999... - 1 hónapja</p>
                <p>+ további 3 poszt</p>
            </>}
        </div>
    )
}
