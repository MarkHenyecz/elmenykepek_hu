import './global.css'
import '../components/scss/layout.scss'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Elményképek',
  description: 'Élményképek feltöltésére kitalált oldal, hogy a magyar szerepjátékot egy új szintre emeljük. Karakterek kezelése egy helyen, automata log szerkesztő és még sok más.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={inter.className}>
        <Header />
        
        <div className="content">
          {children}
        </div>

        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
