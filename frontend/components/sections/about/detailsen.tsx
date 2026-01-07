"use client"
import { Rocket, ShieldCheck, Target, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function DetailsEn() {
  const [destination, setDestination] = useState("/auth")

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setDestination('/home')
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white">
      
      <section className="pt-40 pb-20 px-10 flex flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          Our Interstellar <span className="text-purple-600">Story</span>
        </h1>
        <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
          Orbit is not just a task manager. It is the engineering behind your productivity, 
          built for those who wish to master their own time without getting lost in the vacuum of procrastination.
        </p>
      </section>

      <section className="py-20 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard 
            icon={<Target className="w-10 h-10 text-purple-500" />}
            title="Focus"
            description="Keep your goals at the center of your gravitational system."
          />
          <ValueCard 
            icon={<Rocket className="w-10 h-10 text-yellow-500" />}
            title="Speed"
            description="Optimized interface for fast, friction-less launches."
          />
          <ValueCard 
            icon={<Users className="w-10 h-10 text-purple-500" />}
            title="Community"
            description="Made by modern explorers for modern explorers."
          />
          <ValueCard 
            icon={<ShieldCheck className="w-10 h-10 text-yellow-500" />}
            title="Security"
            description="Your data protected by military-grade protocols."
          />
        </div>
      </section>

      <section className="py-20 px-10 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-yellow-500">The Command Station</h2>
            <p className="text-lg text-gray-300">
              Founded in 2026, Orbit emerged when we realized that current tools were 
              too static for a dynamic world. We wanted something that simulated the movement, 
              the order, and the beauty of the cosmos.
            </p>
            <p className="text-lg text-gray-300">
              Every task in our system is treated as a satellite. If you don't fuel it with 
              action, it loses altitude. If you complete it, it shines like a supernova.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full"></div>
              <Image 
                src="/logo/OrbitLogo.png" 
                width={400} 
                height={400} 
                alt="Orbit Central" 
                className="relative z-10 animate-pulse"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-30 text-center pb-20">
        <h2 className="text-4xl font-bold mb-10">Ready for the next launch?</h2>
        <Link href={destination}>
          <button className="transition-all duration-300 cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-bold py-5 px-12 rounded-full text-xl shadow-lg shadow-purple-500/20">
            Start Mission
          </button>
        </Link>
      </section>

    </main>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-purple-500/50 transition-all group">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}