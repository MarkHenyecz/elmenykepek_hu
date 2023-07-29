"use client";
import { useEffect, useRef, useState } from 'react';
import '../../components/scss/profile-character.scss'
import AvatarElem from '../avatar/avatar';
import LoaderElem from '../loader/loader';
import { fileService } from '../api/fileService';
import { characterService } from '../api/characterService';
import { Character } from '../interfaces/character.interface';
import Link from 'next/link';

interface Props {
    character?: Character
    inEditorMode: boolean
    close?: () => void
}

export default function ProfilePageCharacterElem({ character, close, inEditorMode = false }: Props) {
    const [newName, setNewName] = useState(character ? character.name : '')
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File>();
    const [fileData, setFileData] = useState<string | ArrayBuffer | null>(character?.profile_picture ? character.profile_picture?.url : null);
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

    const getDateString = (date: Date) => {
        let formattedTime = '';

        const yesterDay = new Date();
        yesterDay.setDate(yesterDay.getDate() - 1);
        
        const older = new Date();
        older.setDate(older.getDate() - 2);
        
        if(date.getTime() < older.getTime()) {
            formattedTime = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
        } else if(date.getTime() < yesterDay.getTime()) {
            formattedTime = "tegnap"
        } else {
            formattedTime = "ma"
        }

        return formattedTime;
    }

    return (
        <Link href={`/karakter/${character?.id}`}>
            <div className='characterElem'>
                {inEditorMode ?
                <>
                    <AvatarElem 
                        centerIcon={!isFileSet}
                        width={150} 
                        height={150} 
                        iconWidth={isFileSet ? 150 : 80} 
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
                    <AvatarElem 
                    icon={character?.profile_picture?.url} 
                    centerIcon={character?.profile_picture?.url ? true : false} 
                    width={150} 
                    height={150} />
                    <h1>{character?.name}</h1>

                    {character?.posts ? 
                    <>
                        <h2>Feltöltések:</h2>
                        {character.posts.filter((_, key) => key < 3).map(post => 
                            <p key={post.slug}>{post.title} - {getDateString(new Date(post.created_at))}</p>
                        )}
                        {character.posts.length > 3 ? 
                        <p>+ további {character.posts.length - 3} poszt</p>
                        : null}
                    </>
                    : null}
                </>}
            </div>
        </Link>
    )
}
