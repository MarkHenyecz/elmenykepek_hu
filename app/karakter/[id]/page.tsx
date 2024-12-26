"use client";
import { characterService } from '@/components/api/characterService';
import { Character } from '@/components/interfaces/character.interface';
import PostElem from '@/components/post/post'
import ProfilePageCharacterElem from '@/components/profilePageCharacter/profilePageCharacter';
import { useEffect, useState } from 'react';
import Loader2Elem from '@/components/loader/loader2';

interface Props {
  params: { id: number }
}

export default function Home({ params }: Props) {
  const [character, setCharacter] = useState<Character | undefined>(undefined)

  const getData = async () => {
    const pageData = (await characterService.getCharacter(params.id)).data

    setCharacter(pageData)
  }

  useEffect(() => {
    getData()
  }, [])

  if(!character)
    return(
    <main>
      <Loader2Elem />
    </main>
    )

  return (
    <main className='flex flex-col items-center justify-center gap-4'>
      <ProfilePageCharacterElem inEditorMode={false} character={character} />

      {character.posts.map((post) => 
        <PostElem 
        hideCharacter
        key={post.slug} 
        post={post} 
        />
      )}
    </main>
  )
}
