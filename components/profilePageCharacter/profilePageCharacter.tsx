"use client";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import AvatarElem from '../avatar/avatar';
import LoaderElem from '../loader/loader';
import { fileService } from '../api/fileService';
import { characterService } from '../api/characterService';
import { Character } from '../interfaces/character.interface';
import Link from 'next/link';
import { getBase64 } from '../helpers/getBase64Helper';

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

    useEffect(() => {
        if(!file) return;

        getBase64(file, setFileData as Dispatch<SetStateAction<string>>)
    }, [file])

    const handleSave = async () => {
        if(newName == "") return;

        setIsLoading(true)

        try {
            let dbFile;
            if(file) {
                dbFile = await fileService.uploadFile(file);
            }
            await characterService.createCharacter(newName, dbFile?.data.id)
            
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
            const month = date.getMonth()+1;
            const day = date.getDate();
            formattedTime = `${date.getFullYear()}.${month > 9 ? month : '0'+month}.${day > 9 ? day : '0'+day}`;
        } else if(date.getTime() < yesterDay.getTime()) {
            formattedTime = "tegnap"
        } else {
            formattedTime = "ma"
        }

        return formattedTime;
    }

    return (
        <div className='bg-secondary flex flex-col items-center p-4 overflow-hidden gap-4'>
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
                <input className="bg-primary p-2" type="text" placeholder='Karakter neve' value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button className='bg-primary p-2'
                    onClick={!isLoading ? () => handleSave() : undefined}
                >
                    {!isLoading ? 'Mentés' : <LoaderElem />}
                </button>
            </>
            : 
            <Link href={`/karakter/${character?.id}`} className='flex flex-col items-center bg-primary p-4 h-[100%] w-[100%]'>
                <AvatarElem 
                icon={character?.profile_picture?.url} 
                centerIcon={character?.profile_picture?.url ? true : false} 
                width={150} 
                height={150} 
                iconWidth={character?.profile_picture?.url ? 150 : undefined}
                iconHeight={character?.profile_picture?.url ? 150 : undefined}
                />
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
            </Link>}
        </div>
    )
}
