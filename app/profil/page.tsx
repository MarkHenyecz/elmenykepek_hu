"use client";
import AvatarElem from '@/components/avatar/avatar'
import '../../components/scss/profile.scss'
import ProfilePageCharacterElem from '@/components/profilePageCharacter/profilePageCharacter'
import { useEffect, useState } from 'react';
import { User } from '@/components/interfaces/user.interface';
import { userService } from '@/components/api/userService';
import Loader2Elem from '@/components/loader/loader2';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)

  const getData = async () => {
    setUser((await userService.getMyProfile()).data)
  }

  useEffect(() => {
    getData()
  }, [])

  if(!user)
    return (
    <div className='loading'>
      <Loader2Elem />
    </div>
    )

  return (
    <main className='profile'>
      <AvatarElem 
      icon={user?.profile_picture?.url} 
      centerIcon={typeof user?.profile_picture == 'object'} 
      width={190} 
      height={190} />
      <h1>{user?.name}</h1>
      {user ? 
      <>
        <div className='divider' />
        <h1>Karakterek</h1>
        
        <div className='scrollWrapper'>
            {/* TODO: SCROLL SETUP! */}
            {user.characters.map(character => 
              <ProfilePageCharacterElem key={character.id} character={character} inEditorMode={false} />
            )}
        </div>
      </>
      : null}
    </main>
  )
}
