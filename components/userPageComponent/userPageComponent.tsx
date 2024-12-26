import AvatarElem from "../avatar/avatar"
import { User } from "../interfaces/user.interface"
import ProfilePageCharacterElem from "../profilePageCharacter/profilePageCharacter"

interface Props {
    user: User
}

const UserPageComponent = ({ user }: Props) => {


    return (
        <main className='bg-secondary flex flex-col items-center p-4 overflow-hidden gap-4'>
            <AvatarElem 
            icon={user?.profile_picture?.url} 
            centerIcon={typeof user?.profile_picture == 'object'} 
            width={100} 
            height={100} 
            iconWidth={!user?.profile_picture?.url ? 70 : undefined}
            iconHeight={!user?.profile_picture?.url ? 70 : undefined}
            />
            <h1 className="text-3xl">{user?.name}</h1>
            {user ? 
            <>
                <div className='h-[5px] bg-primary w-[200%]' />
                <h1 className="text-xl">Karakter{user.characters.length > 1 ? 'ek' : ''}</h1>
                
                <div className='grid md:grid-cols-2'>
                    {user.characters.map(character => 
                    <ProfilePageCharacterElem key={character.id} character={character} inEditorMode={false} />
                    )}
                </div>
            </>
            : null}
        </main>
    )
}

export default UserPageComponent;