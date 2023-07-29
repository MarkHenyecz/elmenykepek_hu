"use client";
import '../../../components/scss/profile.scss'
import { useEffect, useState } from 'react';
import { User } from '@/components/interfaces/user.interface';
import { userService } from '@/components/api/userService';
import Loader2Elem from '@/components/loader/loader2';
import { useRouter } from 'next/navigation';
import UserPageComponent from '@/components/userPageComponent/userPageComponent';

interface Props {
  params: { slug: string }
}

export default function Profile({params}: Props) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const getData = async () => {
    try {
      setUser((await userService.getProfile(params.slug)).data)
    } catch {
      router.push('/')
    }
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
    <UserPageComponent user={user} />
  )
}
