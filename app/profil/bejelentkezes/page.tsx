"use client";
import Link from 'next/link';
import '../../../components/scss/registration.scss'
import { useState } from 'react';
import LoaderElem from '@/components/loader/loader';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main>
      <h1>
        Bejelentkezés
      </h1>
      <input type="email" name='email' placeholder='Email cím' />
      <input type="password" name='password' placeholder='Jelszó' />
      <button>
        {isLoading ? <LoaderElem /> : 'Bejelentkezés'}
      </button>
      <Link href={"/profil/regisztracio"}>
        <p>
          Még nem rendelkezem fiókkal...
        </p>
      </Link>
    </main>
  )
}
