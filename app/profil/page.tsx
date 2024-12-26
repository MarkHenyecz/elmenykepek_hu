"use client";
import { useEffect, useState } from 'react';
import { User } from '@/components/interfaces/user.interface';
import { userService } from '@/components/api/userService';
import Loader2Elem from '@/components/loader/loader2';
import UserPageComponent from '@/components/userPageComponent/userPageComponent';

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
    <UserPageComponent user={user} />
  )
}
