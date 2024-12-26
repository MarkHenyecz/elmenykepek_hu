import ProfilePageCharacterElem from '../profilePageCharacter/profilePageCharacter';

interface Props {
    close: () => void
}

const CharacterModal = ({ close }: Props) => {

    return (
        <div 
            className='flex z-10 left-0 top-0 fixed w-[100vw] h-[100vh] bg-[#0000009a] justify-center items-center characterModal' 
            onClick={(e) => (e.target as HTMLDivElement).className.includes('characterModal') ? close() : undefined}
        >
            <ProfilePageCharacterElem inEditorMode={true} close={close} />
        </div>
    )
}

export default CharacterModal;