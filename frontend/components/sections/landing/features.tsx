import { Rocket, Star, Sun, Orbit } from "lucide-react";

export function Features() {


    const sC = 'p-10 space-y-5 cursor-pointer transition-all duration-300 bg-black/40 w-80 h-80 rounded-2xl shadow-2xl shadow-yellow-200 hover:shadow-xl hover:shadow-yellow-500 hover:-translate-y-0.5'

    return (

        <section className="py-30 px-10">

            <div className="flex justify-center">

                <h1 className="text-5xl font-bold">Funcionalidades <span className="text-yellow-500 font-bold">Estelares</span></h1>
                
            </div>

            <div className="flex justify-center gap-30 p-20">

                <div className={sC}>

                    <h1 className="text-3xl text-yellow-500 font-bold">Lançamento de Tarefas:</h1>
                    <p>Adicione metas com rapidez e precisão.</p>

                    <div className="flex justify-center">
                    <Rocket className="w-16 h-16 text-yellow-500"/>
                    </div>

                </div>

                <div className={sC}>

                    <h1 className="text-3xl text-yellow-500 font-bold">Sistemas de Prioridade:</h1>
                    <p>Organize suas tarefas por força gravitacional</p>

                    <div className="flex justify-center">
                    <Sun className="w-16 h-16 text-yellow-500"/>
                    </div>

                </div>

                <div className={sC}>

                    <h1 className="text-3xl text-yellow-500 font-bold">Interface Galáctica:</h1>
                    <p>Design moderno e imersivo para uma leitura clara.</p>

                    <div className="flex justify-center items-end">
                    <Star className="w-16 h-16 text-yellow-500"/>
                    </div>

                </div>

                <div className={sC}>

                    <h1 className="text-3xl text-yellow-500 font-bold">Sincronização de Órbita:</h1>
                    <p>Persistência de dados para garantir que seu progresso nunca se perca no vácuo.</p>

                    <div className="flex justify-center">
                    <Orbit className="w-16 h-16 text-yellow-500"/>
                    </div>

                </div>

            </div>


        </section>
    
    )

}