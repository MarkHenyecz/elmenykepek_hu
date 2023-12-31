import AvatarElem from "../avatar/avatar"
import { User } from "../interfaces/user.interface"
import ProfilePageCharacterElem from "../profilePageCharacter/profilePageCharacter"

interface Props {
    user: User
}

const UserPageComponent = ({ user }: Props) => {


    return (
        <main className='profile'>
            <AvatarElem 
            icon={user?.profile_picture?.url} 
            centerIcon={typeof user?.profile_picture == 'object'} 
            width={190} 
            height={190} 
            iconWidth={!user?.profile_picture?.url ? 140 : undefined}
            iconHeight={!user?.profile_picture?.url ? 140 : undefined}
            />
            <h1>{user?.name}</h1>
            {user ? 
            <>
                <div className='divider' />
                <h1>Karakter{user.characters.length > 1 ? 'ek' : ''}</h1>
                
                <div className='scrollWrapper'>
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