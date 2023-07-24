"use client";
import { useState } from 'react';
import '../../components/scss/profile-character.scss'
import AvatarElem from '../avatar/avatar';

interface Props {
    inEditorMode: boolean
}

export default function ProfilePageCharacterElem({ inEditorMode = false }: Props) {
    const [newName, setNewName] = useState('')

    return (
        <div className='characterElem'>
            {inEditorMode ?
            <>
                <AvatarElem width={150} height={150} />
                <input type="text" placeholder='Karakter neve' value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button>
                    Mentés
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
