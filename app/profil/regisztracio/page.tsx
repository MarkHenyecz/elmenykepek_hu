"use client";
import '../../../components/scss/registration.scss'

export default function Home() {
  return (
    <main>
      <h1>
        Regisztráció
      </h1>
      <input type="email" name='email' placeholder='Email cím' />
      <input type="password" name='password' placeholder='Jelszó' />
      <input type="password" name='password-again' placeholder='Jelszó mégegyszer' />
      <button>
        Regisztráció
      </button>
      <p>
        Már rendelkezem fiókkal...
      </p>
    </main>
  )
}
