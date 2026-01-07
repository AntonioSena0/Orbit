"use client";

import { useEffect, useState } from "react"
import { Footer } from "@/components/layout/footer"
import { ProfileCard } from "@/components/sections/profile/profilecard"
import Link from "next/link";
import { ProfileCardEn } from "@/components/sections/profile/profilecarden";

export default function Profile() {
  const [hasToken, setHasToken] = useState(false)

  const [language, setLanguage] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('orbit_language') || 'pt-br'
      }
      return 'pt-br'
  })

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      setHasToken(true)
    }
  }, []);

  return (

    <>
    {hasToken ? (
      <>

        {language === 'en' ? (

          <ProfileCardEn />

        ) : (

          <ProfileCard />

        )}


        <Footer />
      </>
    ) : (

      <div className="bg-linear-to-b from-black via-gray-800 to-black bg-fixed flex flex-col h-screen w-screen justify-center items-center gap-10">
      
        <h1 className="text-5xl text-purple-600">Você não está com login feito</h1>
        <Link href="auth/">
          <button className="transition-all duration-300 cursor-pointer bg-purple-800 rounded-full h-15 w-40 hover:bg-purple-600 active:bg-purple-800 hover:-translate-y-0.5 active:translate-y-0.5">Entrar</button>
        </Link>

      </div>

    )}

    </>

  )
}