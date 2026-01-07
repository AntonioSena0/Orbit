"use client"
import { Rocket, ShieldCheck, Target, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


export function Details() {

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
            Nossa <span className="text-purple-600">História</span> Interestelar
          </h1>
          <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
            A Orbit não é apenas um gerenciador de tarefas. É a engenharia por trás da sua produtividade, 
            construída para quem deseja dominar seu próprio tempo sem se perder no vácuo da procrastinação.
          </p>
        </section>

        <section className="py-20 px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<Target className="w-10 h-10 text-purple-500" />}
              title="Foco"
              description="Manter suas metas no centro do seu sistema gravitacional."
            />
            <ValueCard 
              icon={<Rocket className="w-10 h-10 text-yellow-500" />}
              title="Velocidade"
              description="Interface otimizada para lançamentos rápidos e sem fricção."
            />
            <ValueCard 
              icon={<Users className="w-10 h-10 text-purple-500" />}
              title="Comunidade"
              description="Feito por exploradores modernos para exploradores modernos."
            />
            <ValueCard 
              icon={<ShieldCheck className="w-10 h-10 text-yellow-500" />}
              title="Segurança"
              description="Seus dados protegidos por protocolos de nível militar."
            />
          </div>
        </section>

        <section className="py-20 px-10 bg-white/5 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-yellow-500">A Estação de Comando</h2>
              <p className="text-lg text-gray-300">
                Fundada em 2026, a Orbit surgiu quando percebemos que as ferramentas atuais eram 
                estáticas demais para um mundo dinâmico. Queríamos algo que simulasse o movimento, 
                a ordem e a beleza do cosmos.
              </p>
              <p className="text-lg text-gray-300">
                Cada tarefa em nosso sistema é tratada como um satélite. Se você não a alimenta com 
                ação, ela perde altitude. Se você a completa, ela brilha como uma supernova.
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

        <section className="py-30 text-center">
          <h2 className="text-4xl font-bold mb-10">Pronto para o próximo lançamento?</h2>
          <Link href={destination}>
            <button className="transition-all duration-300 cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-bold py-5 px-12 rounded-full text-xl shadow-lg shadow-purple-500/20">
              Iniciar Missão
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