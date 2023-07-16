"use client";
import Link from 'next/link';
import '../../../components/scss/registration.scss'
import { useState } from 'react';
import LoaderElem from '@/components/loader/loader';

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className='registration'>
      <h1>
        Regisztráció
      </h1>
      <input type="email" name='email' placeholder='Email cím' />
      <input type="password" name='password' placeholder='Jelszó' />
      <input type="password" name='password-again' placeholder='Jelszó mégegyszer' />
      <button>
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
