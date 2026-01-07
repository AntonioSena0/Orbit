"use client"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/landing/hero"
import { Features } from "@/components/sections/landing/features"
import { About } from "@/components/sections/landing/about"
import { FAQ } from "@/components/sections/landing/faq"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Landing() {

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleLoading = () => {

    if(loading) {

      setLoading(false)

    } else {

      setLoading(true)

    }

  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      router.push('/home')
    } else {
      handleLoading()
    }
  }, [router])

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <p className="text-white font-bold tracking-widest animate-pulse">
          VERIFICANDO BASE...
        </p>
      </div>
    )
  }

  return (

    <>
    
      <Header />
      <main className="w-full h-full bg-linear-to-b from-black via-gray-800 to-black bg-fixed flex flex-col">
        <Hero />
        <Features />
        <FAQ />
        <About />
      </main>
      <Footer />

    </>



  )

}