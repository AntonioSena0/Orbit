"use client"
import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Details } from "@/components/sections/about/details"
import { DetailsEn } from "@/components/sections/about/detailsen"

export default function AboutPage() {
  const [language, setLanguage] = useState<'pt-br' | 'en'>('pt-br')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const storedLang = localStorage.getItem('orbit_language') as 'pt-br' | 'en'
    if (storedLang) {
      setLanguage(storedLang)
    }
  }, [])

  if (!mounted) return <div className="min-h-screen bg-linear-to-b from-black via-gray-800 to-black" />

  return (
    <>
      <Header />

      {language === 'en' ? (
        <DetailsEn />
      ) : (
        <Details />
      )}

      <Footer />
    </>
  )
}