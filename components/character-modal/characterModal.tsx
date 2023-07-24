import { useRef } from 'react';
import ProfilePageCharacterElem from '../profilePageCharacter/profilePageCharacter';
import "../scss/characterModal.scss"

interface Props {
    close: () => void
}

const CharacterModal = ({ close }: Props) => {

    return (
        <div 
            className='characterModal' 
            onClick={(e) => (e.target as HTMLDivElement).className == 'characterModal' ? close() : undefined}
        >
            <ProfilePageCharacterElem inEditorMode={true} />
        </div>
    )
}

export default CharacterModal;