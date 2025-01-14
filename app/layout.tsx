import './global.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Élményképek',
  description: 'Élményképek feltöltésére kitalált oldal, hogy a magyar szerepjátékot egy új szintre emeljük. Karakterek kezelése egy helyen, automata log szerkesztő és még sok más.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`bg-primary text-main ${inter.className}`}>
        <Header />
        
        <div className="flex justify-center items-center min-h-[80vh]">
          {children}
        </div>

        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
