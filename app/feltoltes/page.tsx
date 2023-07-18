"use client";
import { useState } from 'react';
import '../../components/scss/upload.scss'
import Image from 'next/image';


export default function LogEditor() {
  const [uploadedImages, setUploadedImages] = useState([])

  return (
    <main className='upload'>
      <input type="text" placeholder='Album címe...' />

      <div className='characterSection'>
        <select>
          <option disabled selected>Válassz karaktert</option>
          <option value={1}>Gino Rivers</option>
        </select>

        <p>
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
