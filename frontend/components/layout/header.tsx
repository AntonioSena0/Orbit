"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('orbit_language') || 'pt-br'
    }
    return 'pt-br'
  })

  const linkStyle = 'hover:text-purple-400 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 active:scale-95 uppercase tracking-wider text-sm'

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = {
    'pt-br': {
      about: "Sobre Nós",
      tasks: "Tarefas",
      profile: "PERFIL",
      login: "ENTRAR"
    },
    'en': {
      about: "About Us",
      tasks: "Tasks",
      profile: "PROFILE",
      login: "SIGN IN"
    }
  }[language === 'en' ? 'en' : 'pt-br']

  return (
    <header className={`
      w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out border-b
      ${isScrolled 
        ? "h-20 bg-black/80 backdrop-blur-lg border-purple-500/30 shadow-[0_4px_30px_rgba(147,51,234,0.1)]" 
        : "h-28 bg-transparent border-transparent"}
    `}>
      <nav className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-white">
        
        <div className="flex-1 flex justify-end gap-12 font-medium">
          {isLoggedIn && (
            <Link href="/home" className={linkStyle}>Home</Link>
          )}
          <Link href="/about" className={linkStyle}>{content.about}</Link>
        </div>

        <div className="flex px-10 group shrink-0">
          <Link href={isLoggedIn ? "/home" : "/"}>
            <Image
              src='/logo/OrbitLogo.png'
              width={180}
              height={180}
              alt="Logo Orbit"
              className={`transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] 
                ${isScrolled ? "w-24 h-24" : "w-32 h-32"}`}
            />
          </Link>
        </div>

        <div className="flex-1 flex justify-start gap-12 items-center font-medium">
          {isLoggedIn ? (
            <>
              <Link href="/tasks" className={linkStyle}>{content.tasks}</Link>
              <Link href="/profile">
                <button className="cursor-pointer px-6 py-2 rounded-full font-bold border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-all active:scale-95">
                  {content.profile}
                </button>
              </Link>
            </>
          ) : (
            <Link href="/auth">
              <button className="cursor-pointer px-8 py-2 rounded-full font-bold bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all active:scale-95">
                {content.login}
              </button>
            </Link>
          )}
        </div>

      </nav>
    </header>
  )
}