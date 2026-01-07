import Image from "next/image"
import Link from "next/link"

export function About() {


    return (

        <section className="p-10 pr-30 pl-30">

        <div className="grid grid-cols-3 grid-rows-2 items-center justify-center">

            <div className="grid justify-center gap-10 col-start-1">

                    <h1 className="text-5xl font-bold text-purple-600">Nossa Missão:</h1>
                    <p className="w-175">

                    A <span className="text-purple-600 font-semibold">Orbit</span> nasceu da ideia de que gerenciar tarefas
                    não deve ser um fardo, mas uma jornada fluida. Em um mundo cheio de distrações e ruídos, criamos uma estação
                    de comando onde suas metas não são apenas linhas de texto, mas corpos celestes que você mantém em perfeita harmonia.

                    </p>

            </div>

            <div className="grid justify-center col-start-2">

                <Image

                        src='/logo/OrbitLogo.png'
                        width={500}
                        height={500}
                        alt="Logo da Orbit"
                        className="w-150 h-150"

                />

            </div>

            <div className="grid justify-center gap-10 col-start-3">

                <h1 className="text-5xl font-bold text-yellow-500">Por que Orbit?</h1>
                <p className="w-175">

                 Acreditamos que todo grande projeto — seja ele um estudo, um trabalho ou um sonho pessoal —
                 precisa de um sistema gravitacional que o mantenha no caminho certo. Na
                 <span className="text-yellow-500 font-semibold"> Orbit</span>,
                 ajudamos você a mapear sua rota e garantir que cada lançamento diário seja um sucesso.

                </p>

            </div>

            <div className="grid justify-center col-start-2 gap-20">

                <h1 className="text-5xl font-bold w-300 text-center">
                    Tudo pronto para tirar seus planos do papel? <span className="text-purple-600"> Junte-se à nossa tripulação </span>
                    e coloque suas metas em órbita <span className="text-yellow-500">hoje mesmo</span> .
                </h1>

                <div className="grid justify-center">

                    <Link href="auth/">
                        <button className="transition-all duration-300 cursor-pointer bg-purple-800 px-2 py-2 rounded-full h-20 w-60 hover:bg-purple-600 active:bg-purple-800 hover:-translate-y-0.5 active:translate-y-0.5">Cadastre-se</button>
                    </Link>

                </div>

            </div>

            </div>

        </section>
    
    )

}