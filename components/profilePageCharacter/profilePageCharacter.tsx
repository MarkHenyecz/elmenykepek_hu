"use client";
import '../../components/scss/profile-character.scss'
import AvatarElem from '../avatar/avatar';


export default function ProfilePageCharacterElem() {


    return (
        <div className='characterElem'>
            <AvatarElem width={150} height={150} />
            <h1>Gino Rivers</h1>
            <h2>Feltöltések:</h2>
            <p>Drug Dealin’ vol 1 - ma</p>
            <p>NNI baromkodások vol 8999 - tegnap</p>
            <p>NNI baromkodások vol 8999... - 1 hónapja</p>
            <p>+ további 3 poszt</p>
        </div>
    )
}
