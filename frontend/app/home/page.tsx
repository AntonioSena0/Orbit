"use client"
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Dashboard } from "@/components/sections/home/dashboard";
import { DashboardEn } from "@/components/sections/home/dashboarden";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

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

            <Header />

            {language === 'en' ? (

            <DashboardEn />

            ) : (

            <Dashboard />

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