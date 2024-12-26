"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CharacterModal from '@/components/character-modal/characterModal';
import { Character } from '@/components/interfaces/character.interface';
import { characterService } from '@/components/api/characterService';
import ImageFromFile from '@/components/imageFromFile/imageFromFile';
import LoaderElem from '@/components/loader/loader';
import { File as IFile } from '@/components/interfaces/file.interface';
import { fileService } from '@/components/api/fileService';
import { AxiosResponse } from 'axios';
import { postService } from '@/components/api/postService';
import { useRouter } from 'next/navigation';


export default function LogEditor() {
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const getData = async () => {
    setCharacters((await characterService.getMyCharacters()).data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleFileChanges = (files: FileList | null) => {
    if(!files) return;
    const newFiles: File[] = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      newFiles.push(file)
    }

    setUploadedImages(newFiles)
  }

  const handleSave = async () => {
    if(!selectedCharacter) return;
    setIsLoading(true)

    try {
      const fileUploadJobs: Promise<AxiosResponse<IFile, any>>[] = []
      uploadedImages.forEach(file => {
        fileUploadJobs.push(fileService.uploadFile(file))
      });

      await Promise.all(fileUploadJobs).then(async (result) => {
        await postService.createPost(title, selectedCharacter, result.map(resp => resp.data.id))
        router.push('/profil')
      });
    } catch {}

    setIsLoading(false)
  }

  return (
    <main className='bg-secondary flex flex-col align-center gap-4 p-4'>
      {isModalOpen ? <CharacterModal close={() => {setIsModalOpen(false); getData();}} /> : null}

      <input className='text-3xl bg-primary border-primary border-[.5rem]' type="text" placeholder='Album címe...' value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className='flex align-center gap-8'>
        <select 
          className='bg-primary border-primary border-[.5rem]'
          onChange={(e) => setSelectedCharacter(parseInt(e.target.value))}
        >
          <option disabled selected={selectedCharacter == null}>Válassz karaktert</option>
          {characters?.map(item =>
            <option value={item.id} key={item.id} selected={selectedCharacter == item.id}>{item.name}</option>
          )}
        </select>

        <p 
          className='flex items-center text-center cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          + új karakter létrehozása
        </p>
      </div>

      <div className={`bg-primary p-4 flex flex-col items-center gap-4 cursor-pointer`} onClick={() => fileRef.current?.click()}>
        {uploadedImages.length == 0 ?
          <>
            <Image 
              src={"/icons/upload-icon.svg"}
              alt={"Feltöltés ikon"}
              width={100}
              height={100}
            />
            <p>A felöltéshez húzd ide a képeket vagy kattints a dobozba</p>
          </>
        : uploadedImages.map((data, key) => <ImageFromFile file={data}  key={key} />)}
        <input 
          type="file" 
          multiple 
          hidden 
          accept='.jpg,.png'
          ref={fileRef} 
          onChange={(e) => handleFileChanges(e.target.files)} 
        />
      </div>

      <button className='bg-primary p-4' onClick={() => !isLoading ? handleSave() : undefined}>
        {!isLoading ? 'Publikálás' : <LoaderElem />}
      </button>
    </main>
  )
}
