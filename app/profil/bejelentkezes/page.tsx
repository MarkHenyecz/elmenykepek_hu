"use client";
import Link from 'next/link';
import '../../../components/scss/registration.scss'
import { useState } from 'react';
import LoaderElem from '@/components/loader/loader';
import { userService } from '@/components/api/userService';
import { useAuthStore } from '@/components/stores/authStore';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authStore = useAuthStore()
  const router = useRouter()

  const tryLogin = async () => {
    setIsLoading(true)

    try {
      const response = await userService.tryLogin(email, password)
      localStorage.setItem('token', response.data)
      authStore.setState(true, response.data)
      router.push('/profil')
    } catch {}

    setIsLoading(false)
  }

  return (
    <main className='registration'>
      <h1>
        Bejelentkezés
      </h1>
      <input type="email" name='email' placeholder='Email cím' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={!isLoading ? () => tryLogin() : undefined}>
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
