"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const texto = 'cursor-pointer hover:-translate-y-0.5 hover:text-white active:translate-y-0.5 active:text-purple-400 text-purple-200 transition-all duration-300'

export function Footer() {
  const [isLogged, setIsLogged] = useState(false)
  
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('orbit_language') || 'pt-br'
    }
    return 'pt-br'
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setIsLogged(true)
    }
  }, [])

  const content = {
    'pt-br': {
      start: "Início",
      about: "Quem somos?",
      tasks: "Tarefas",
      support: "Suporte",
      help: "Ajuda (FAQ)",
      contact: "Contate-nos",
      rights: "Todos os direitos reservados."
    },
    'en': {
      start: "Home",
      about: "Who are we?",
      tasks: "Tasks",
      support: "Support",
      help: "Help (FAQ)",
      contact: "Contact Us",
      rights: "All rights reserved."
    }
  }[language === 'en' ? 'en' : 'pt-br']

  return(
    <footer className="bg-linear-to-t from-black/50 via-purple-950/50 to-purple-800/60 border-t border-white">
      <div className="p-8 flex md:flex-row justify-around items-center">
        
        <div className="flex flex-col items-center md:items-center justify-center gap-4">
          <Image src="/logo/OrbitLogo.png" alt="logo" width={100} height={50} className='rounded-full border-2 border-purple-400'/>
          
          <ul className="text-sm text-white font-semibold flex flex-col gap-2">
            <Link href={isLogged ? '/home' : '/'}>
              <li className={texto}>{content.start}</li>
            </Link>
            <Link href={'/about'}>
              <li className={texto}>{content.about}</li>
            </Link>
            {isLogged && ( 
              <Link href={'/tasks'}>
                <li className={texto}>{content.tasks}</li>
              </Link>
            )}
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-white mb-3">{content.support}</h3>
          <ul className="text-sm text-white font-semibold flex flex-col gap-2">
            <li className={texto}>{content.help}</li>
            <li className={texto}>{content.contact}</li>
          </ul>
        </div>

      </div>

      <div className="p-3 text-center text-xs text-white">
        &copy; {new Date().getFullYear()} Orbit. {content.rights}
      </div>
    </footer>
  )
}