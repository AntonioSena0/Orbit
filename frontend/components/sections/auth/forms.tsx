"use client"
import axios from "axios"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Forms() {

    const [isLogin, setIsLogin] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

    const [usernameu, setUsernameu] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailAuth, setEmailAuth] = useState('')
    const [passwordAuth, setPasswordAuth] = useState('')

    const [error, setError] = useState('')
    const [error2, setError2] = useState('')

    const handleShowPassword = () => {

        if(isLogin) {

            if(!visible2) {

                setVisible2(true)

            } else {

                setVisible2(false)

            }

        } else {

            if(!visible) {

                setVisible(true)

            } else {

                setVisible(false)

            }

        }

    }

    const handleSubmitLogin = async (e: React.FormEvent) => {

        e.preventDefault()
        setError2('')

        try {

            const response = await fetch('v1/auth/login', {

                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({emailAuth, passwordAuth})

            })

            if(response.ok) {

                const token = await response.text()
                localStorage.setItem('token', token)
                window.location.href = '/profile'

            } else {

                setError2('Email ou senha incorretos')

            }

        } catch(e) {

            console.error("Erro na conexão:", e);
            setError("Não foi possível conectar ao servidor.");

        }

    }

    const handleSubmitRegister = async (e: React.FormEvent) => {

        e.preventDefault()
        setError('')

        try{

            const response = await axios.post('v1/users/create', {
                usernameu: usernameu,
                email: email,
                password: password
            })

            if (response.data) {
                const token = response.data;
                localStorage.setItem('token', token);
                window.location.href = '/profile';
            }

        } catch(e: any) {

            console.error("Erro na requisição:", e);

            if (e.response) {
                const serverMessage = e.response.data;
                
                if (serverMessage.includes("já existe") || serverMessage.includes("cadastrado")) {
                    setError("Email ou nome de usuário já em uso.");
                } else {
                    setError(serverMessage || "Erro nos dados enviados.");
                }
            } else {
                setError("Não foi possível conectar ao servidor orbit.");
            }

        }

    }

    const inputS = "text-black bg-white border-2 rounded border-purple-500 pl-2 w-75 h-10 outline-none focus:border-purple-700 transition-all"

    return (
        <main className="flex h-screen w-full justify-center items-center p-10 overflow-hidden bg-linear-to-b from-black via-gray-800 to-black bg-fixed">
            <div className="relative w-[1000px] h-[600px] flex shadow-2xl shadow-purple-500 rounded-2xl overflow-hidden bg-white">

                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <motion.div
                            key="login"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex w-full h-full"
                        >
                            <div className="bg-white h-full w-1/2 flex flex-col p-10 justify-center">
                                <h1 className="text-4xl font-bold text-purple-600 mb-8">Entrar</h1>
                                <form className="flex flex-col gap-6 items-center">
                                    <input placeholder="Email" onChange={(e) => setEmailAuth(e.target.value)} value={emailAuth} type="email" className={inputS}/>
                                    <div className="relative flex items-center">
                                        <input onChange={(e) => setPasswordAuth(e.target.value)} placeholder="Senha" value={passwordAuth} type={visible2 ? 'text' : 'password'} className={`${inputS} pr-12`}/>
                                        {visible2 ? (

                                            <EyeOff onClick={handleShowPassword} className="w-6 h-6 text-purple-600 cursor-pointer absolute right-3"/>

                                        ) : (

                                            <Eye onClick={handleShowPassword} className="w-6 h-6 text-purple-600 cursor-pointer absolute right-3"/>

                                        )}

                                    </div>
                                    {error2 && (
                                        <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-xl text-center text-sm backdrop-blur-md animate-pulse">
                                            {error2}
                                        </div>
                                    )}
                                    <button onClick={handleSubmitLogin} className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-purple-800 transition-all cursor-pointer">
                                        Entrar
                                    </button>
                                </form>
                            </div>
                            <div className="bg-purple-600 h-full w-1/2 flex flex-col p-10 justify-center items-center text-center text-white gap-6">
                                <h2 className="text-3xl font-bold">Bem-vindo de Volta!</h2>
                                <p>Pronto para colocar tudo em órbita de novo?</p>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="px-8 py-2 border-2 border-white rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-all cursor-pointer"
                                >
                                    Cadastre-se
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-row-reverse w-full h-full"
                        >
                            <div className="bg-white h-full w-1/2 flex flex-col p-10 justify-center">
                                <h1 className="text-4xl font-bold text-purple-600 mb-8">Criar Conta</h1>
                                <form className="flex flex-col gap-6 items-center">
                                    <input placeholder="Nome de usuário" onChange={(e) => setUsernameu(e.target.value)} value={usernameu} type="text" className={inputS}/>
                                    <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} className={inputS}/>
                                    <div className="relative flex items-center">
                                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Senha" value={password} type={visible ? 'text' : 'password'} className={`${inputS} pr-12`}/>
                                        {visible ? (

                                            <EyeOff onClick={handleShowPassword} className="w-6 h-6 text-purple-600 cursor-pointer absolute right-3"/>

                                        ) : (

                                            <Eye onClick={handleShowPassword} className="w-6 h-6 text-purple-600 cursor-pointer absolute right-3"/>

                                        )}
                                    </div>
                                    {error && (
                                        <div className="bg-red-500/60 border border-red-500/80 text-white p-3 rounded-xl text-center text-sm backdrop-blur-md animate-pulse">
                                            {error}
                                        </div>
                                    )}
                                    <button onClick={handleSubmitRegister} className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-purple-800 transition-all cursor-pointer">
                                        Cadastrar
                                    </button>
                                </form>
                            </div>
                            <div className="bg-purple-600 h-full w-1/2 flex flex-col p-10 justify-center items-center text-center text-white gap-6">
                                <h2 className="text-3xl font-bold">Seja Bem-vindo!</h2>
                                <p>Comece sua jornada estelar agora mesmo.</p>
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="cursor-pointer px-8 py-2 border-2 border-white rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-all"
                                >
                                    Entrar
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}