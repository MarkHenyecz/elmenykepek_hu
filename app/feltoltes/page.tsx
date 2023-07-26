"use client";
import { useEffect, useState } from 'react';
import '../../components/scss/upload.scss'
import Image from 'next/image';
import CharacterModal from '@/components/character-modal/characterModal';
import { Character } from '@/components/interfaces/character.interface';
import { characterService } from '@/components/api/characterService';
import { File } from '@/components/interfaces/file.interface';


export default function LogEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const getData = async () => {
    setCharacters((await characterService.getMyCharacters()).data)
  }

  useEffect(() => {getData()}, [])

  return (
    <main className='upload'>
      {isModalOpen ? <CharacterModal close={() => {setIsModalOpen(false); getData();}} /> : null}

      <input type="text" placeholder='Album címe...' />

      <div className='characterSection'>
        <select>
          <option disabled selected>Válassz karaktert</option>
          {characters?.map(item =>
            <option value={item.id}>{item.name}</option>
          )}
        </select>

        <p onClick={() => setIsModalOpen(true)}>
          + új karakter létrehozása
        </p>
      </div>

      <div className={`uploadSection ${uploadedImages.length == 0 && 'empty'}`}>
        {uploadedImages.length == 0 ?
          <>
            <Image 
              src={"/icons/upload-icon.svg"}
              alt={"Feltöltés ikon"}
              width={128}
              height={128}
            />
            <p>A felöltéshez húzd ide a képeket vagy kattints a dobozba</p>
          </>
        : uploadedImages.map(data => <img />)}
      </div>
    </main>
  )
}
