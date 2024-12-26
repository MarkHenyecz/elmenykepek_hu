"use client";
import Link from 'next/link';
import { useState } from 'react';
import LoaderElem from '@/components/loader/loader';
import { useRouter } from 'next/navigation';
import { userService } from '@/components/api/userService';

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const router = useRouter()

  const tryRegister = async () => {
    setIsLoading(true)

    try {
      if(password != passwordAgain) {
        throw new Error('A két jelszó nem egyezik');
      }

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!emailRegex.test(email)) {
        throw new Error('Nem megfelelő email cím');
      }

      if(name.length < 3) {
        throw new Error('Túl rövid felhasználónév');
      }

      await userService.tryRegister(email, name, password)
      router.push('/profil/bejelentkezes')
    } catch(e) {
      const error = (e as Error);
      if(error.message) {
        // TODO: Notification
        console.log(error.message);
      }
    }

    setIsLoading(false)
  }

  return (
    <main className='bg-secondary flex flex-col justify-center items-center p-4 gap-4'>
      <h1 className='text-3xl'>
        Regisztráció
      </h1>
      <input className='bg-primary p-2' type="username" name='username' placeholder='Felhasználónév' value={name} onChange={(e) => setName(e.target.value)} />
      <input className='bg-primary p-2' type="email" name='email' placeholder='Email cím' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='bg-primary p-2' type="password" name='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className='bg-primary p-2' type="password" name='password-again' placeholder='Jelszó mégegyszer' value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
      <button className='bg-primary p-2' onClick={!isLoading ? () => tryRegister() : undefined}>
        {isLoading ? <LoaderElem /> : 'Regisztráció'}
      </button>
      <Link href={"/profil/bejelentkezes"}>
        <p>
          Már rendelkezem fiókkal...
        </p>
      </Link>
    </main>
  )
}
