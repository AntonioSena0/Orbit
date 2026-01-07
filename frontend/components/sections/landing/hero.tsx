import Image from "next/image"
import Link from "next/link"

export function Hero() {


    return (

        <section>

        <div className="flex items-center justify-center">

            <div className="flex flex-col gap-10">

                    <h1 className="text-5xl font-bold">Bem vindo ao <span className="text-purple-600">Orbit</span></h1>
                    <p className="w-175">

                    <span className="text-purple-600 font-semibold">Orbit</span> é um sistema de gerenciamento de tarefas projetado para trazer ordem
                    ao caos do dia a dia. Com uma temática inspirada na mecânica celeste, o Orbit ajuda você
                    a manter suas responsabilidades em sincronia, garantindo que nenhum compromisso saia de órbita.

                    </p>

            </div>

            <div className="flex">

                <Image
                        src='/logo/OrbitLogo.png'
                        width={500}
                        height={500}
                        alt="Logo da Orbit"
                        className="w-150 h-150"

                />

            </div>

            </div>


            <div className="flex items-center justify-center">

                <div className="flex">

                    <Link href="auth/">
                        <button className="transition-all duration-300 cursor-pointer bg-purple-800 px-2 py-2 rounded-full h-20 w-60 hover:bg-purple-600 active:bg-purple-800 hover:-translate-y-0.5 active:translate-y-0.5">Cadastre-se</button>
                    </Link>
                    

                </div>

            </div>

        </section>
    
    )

}