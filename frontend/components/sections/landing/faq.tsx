"use client"

import { useState } from 'react'
import { Plus, X } from "lucide-react"
import {motion, AnimatePresence} from "framer-motion"

interface faqDataProps {

    question: string,
    highlight: string,
    answer: string

}

const faqData = [
    {
        question: "1. Meus dados de tarefas estão seguros?",
        highlight: "estão seguros?",
        answer: "Sim! Suas metas são armazenadas em nossa Base de Comando. Isso garante que cada tarefa tenha sua integridade preservada através de um sistema de banco de dados relacional robusto e profissional."
    },
    {
        question: "2. Posso acessar minhas tarefas de",
        highlight: " diferentes dispositivos?",
        answer: "Com certeza. Diferente de listas que usam apenas o armazenamento do navegador (LocalStorage), o Orbit utiliza nossa base de comando para armazenar seus dados. Isso significa que sua órbita é universal: basta logar na sua estação para encontrar suas tarefas exatamente onde as deixou."
    },
    {
        question: "3. O que acontece se eu ",
        highlight: "deletar uma tarefa por engano?",
        answer: "Operamos com protocolos de segurança rigorosos. Caso tenha excluído, talvez ela esteja em sua lixeira, acesse ela e clique em restaurar se for preciso, caso não esteja lá, sua tarefa foi apagada."
    },
    {
        question: "O sistema suporta um ",
        highlight: "grande volume de tarefas?",
        answer: "O Orbit foi projetado para escalar. Graças à indexação eficiente, você pode ter milhares de tarefas em órbita sem perder a velocidade da luz na busca e na organização do seu dia a dia."
    },
];

function FAQItem({ question, highlight, answer }: faqDataProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-5 p-5 bg-black/50 rounded-4xl mb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h1 className="text-2xl font-medium">
                    {question.replace(highlight, "")}
                    <span className="text-purple-600 font-bold">{highlight}</span>
                </h1>

                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0}}
                    transition={{ duration: 0.3, ease: 'easeInOut'}}
                >
                    <Plus className={`w-10 h-10 ${isOpen ? 'text-white' : 'text-purple-600'}`} />
                </motion.div>

            </div>

            <AnimatePresence>

                {isOpen && (

                    <motion.div

                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98]}}
                        className='overflow-hidden'
                    >

                        <p className="text-lg text-gray-300 pt-5 border-t border-white/10 mt-5">
                            {answer}
                        </p>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>


    );
}

export function FAQ() {
    return (
        <section className="flex flex-col py-25 px-30 gap-20">
            <div className="flex justify-center">
                <h1 className="text-5xl font-bold">
                    Perguntas frequentes <span className="text-purple-600 font-bold">(FAQ)</span>
                </h1>

            </div>

            <div className="flex flex-1 flex-col mx-auto w-full">
                {faqData.map((item, index) => (
                    <FAQItem
                        key={index}
                        question={item.question}
                        highlight={item.highlight}
                        answer={item.answer}
                    />
                ))}
            </div>
        </section>
    );
}