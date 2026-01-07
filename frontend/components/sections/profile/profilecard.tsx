"use client"
import { Modal } from "@/components/ui/modal"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { DoorOpen, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface UserData {
    id: string
    usernameu: string
    email: string
    createdAt: string
    sub?: string
}

export function ProfileCard() {

    const [userData, setUserData] = useState<UserData | null>(null)
    const [selectedTab, setSelectedTab] = useState('perfil')

    const [usernameu, setUsernameu] = useState('')

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [notifications, setNotifications] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('orbit_notifications') !== 'false'
        }
        return true
    })

    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('orbit_language') || 'pt-br'
        }
        return 'pt-br'
    })

    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean
        title: string
        message: string
        confirmText: string
        type: 'default' | 'danger'
        action: () => void
    }>({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '',
        type: 'default',
        action: () => {}
    })

    const openModal = (title: string, message: string, confirmText: string, type: 'default' | 'danger', action: () => void) => {
        setModalConfig({ isOpen: true, title, message, confirmText, type, action })
    }

    const logoutHandler = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            window.location.href = '/auth'
        }
    }

    const selectHandler = (option: string) => {
        setSelectedTab(option)
    }

    const getNavItemClass = (option: string) => {
        const baseClass = "cursor-pointer transition-all duration-300"
        const activeClass = "bg-purple-600 text-white w-full rounded-full p-5 font-bold"
        const inactiveClass = "opacity-70 text-white hover:opacity-100"
        
        return `${baseClass} ${selectedTab === option ? activeClass : inactiveClass}`
    }

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            
            if (!token) {
                window.location.href = "/login"
                return
            }

            const decoded = jwtDecode<UserData>(token)
            const userId = decoded.id

            const response = await axios.get(`v1/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setUserData(response.data)
            setUsernameu(response.data.usernameu)

        } catch (e) {
            setError("Não foi possível carregar seus dados da órbita.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    if (loading) return <div className="text-white text-center mt-10 font-bold tracking-widest">CARREGANDO ÓRBITA...</div>

    const handleUpdate = async () => {
        interface updateData {
            usernameu: string
            password?: string
        }

        setError('')
        setSuccess('')

        if (selectedTab === 'privacidade') {
            if (!newPassword || newPassword !== confirmPassword) {
                setError("As novas senhas não coincidem ou estão vazias!")
                return
            }
        }

        try {
            const token = localStorage.getItem('token')
            const updateData: updateData = {
                usernameu: usernameu
            }

            if(selectedTab === 'privacidade'){
                updateData.password = newPassword
            }

            const response = await axios.put(`v1/users/${userData?.id}`, updateData, {
                headers: {Authorization: `Bearer ${token}`}
            })

            const newToken = response.data
            localStorage.setItem('token', newToken)

            await fetchUserData()

            setSuccess("Coordenadas atualizadas com sucesso! Órbita estável.")
            setTimeout(() => setSuccess(''), 3000)

            if (selectedTab === 'privacidade') {
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            }

        } catch(e) {
            console.error("Erro na atualização: ", e)
            setError("Falha na comunicação com o QG")
        }
    }

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`v1/users/${userData?.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            logoutHandler()
        } catch(e) {
            console.error("Erro ao deletar: ", e)
            setError("Falha na comunicação com o QG")
        }
    }

    const triggerUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        openModal(
            "Confirmar Atualização",
            "Deseja salvar as novas coordenadas da sua órbita? Isso atualizará seu banco de dados.",
            "Salvar Alterações",
            "default",
            handleUpdate
        )
    }
    
    const triggerDelete = () => {
        openModal(
            "Encerrar Missão?",
            "Atenção, explorador! Esta ação é irreversível. Todos os seus dados serão pulverizados no espaço profundo.",
            "Sim, Deletar Conta",
            "danger",
            handleDelete
        )
    }

    const saveSettings = () => {
        localStorage.setItem('orbit_notifications', String(notifications))
        localStorage.setItem('orbit_language', language)

        document.documentElement.lang = language
        setSuccess("Preferências sincronizadas com a estação local.")

        setTimeout(() => {
            setSuccess('')
            window.location.reload()
        }, 1500)
    }

    return (
        <main className={`flex h-screen w-full p-10 justify-center items-center overflow-hidden bg-linear-to-b from-black via-gray-800 to-black bg-fixed`}>
            <div className="bg-linear-to-b h-full w-full grid grid-cols-4 grid-rows-2 rounded-2xl items-center">
                
                <div className="col-start-1 row-start-1 row-end-3 flex flex-col h-full">
                    <nav className="w-80 p-10 h-full flex flex-col justify-center">
                        <Link href={"/home"}>
                            <div className="absolute top-20 cursor-pointer gap-2 flex text-white p-5 text-center rounded-full bg-linear-to-l from-purple-600/60 via-gray-800/80 to-purple-600/60  w-30 font-bold hover:bg-purple-500 transition-colors">
                                <Home />Home
                            </div>
                        </Link>

                        <div>
                            <ul className="flex flex-col gap-10">
                                <li onClick={() => selectHandler('perfil')} className={getNavItemClass('perfil')}>Perfil</li>
                                <li onClick={() => selectHandler('informacoes')} className={getNavItemClass('informacoes')}>Informações</li>
                                <li onClick={() => selectHandler('privacidade')} className={getNavItemClass('privacidade')}>Privacidade</li>
                                <li onClick={() => selectHandler('configuracoes')} className={getNavItemClass('configuracoes')}>Configurações</li>
                            </ul>
                        </div>

                        <div>
                            <button onClick={logoutHandler} className="gap-2 absolute bottom-20 flex bg-red-500 text-white p-5 rounded-full cursor-pointer font-bold hover:bg-red-400 transition-colors">
                                <DoorOpen />Sair
                            </button>
                        </div>
                    </nav>
                </div>

                <div className="bg-linear-to-b w-full h-full row-start-1 row-end-3 col-start-2 col-end-5 rounded-2xl">

                    {selectedTab == 'perfil' ? (
                        <div className="p-12 animate-in fade-in slide-in-from-right-10 duration-500">
                            <header className="flex items-center gap-6 mb-12">
                                <div className="w-24 h-24 rounded-full bg-linear-to-tr from-purple-600 to-blue-400 p-1 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl text-white font-bold">
                                        {userData?.usernameu?.[0].toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                        {userData?.usernameu}
                                    </h1>
                                    <p className="text-purple-400">Explorador Espacial</p>
                                </div>
                            </header>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">E-mail de Contato</p>
                                    <p className="text-xl text-white">{userData?.email}</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Membro da Órbita desde</p>
                                    <p className="text-xl text-white">
                                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('pt-BR') : '---'}
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : selectedTab == 'informacoes' ? (
                        <div className="p-12 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white">Informações da Conta</h2>
                                <p className="text-purple-400">Gerencie seus dados pessoais e de contato.</p>
                            </div>

                            <form className="space-y-6 max-w-2xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setUsernameu(e.target.value)}
                                        value={usernameu}
                                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                        placeholder="Seu nome na órbita"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">E-mail (Principal)</label>
                                    <input
                                        type="email"
                                        value={userData?.email}
                                        disabled
                                        className="bg-white/5 border border-white/5 rounded-xl p-4 text-gray-500 cursor-not-allowed"
                                    />
                                    <span className="text-xs text-purple-400/50 ml-1">* O e-mail não pode ser alterado por aqui.</span>
                                </div>

                                <div className="pt-6">
                                    <button
                                        onClick={triggerUpdate}
                                        type="submit"
                                        className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] active:scale-95"
                                    >
                                        Salvar Alterações
                                    </button>
                                </div>
                                {error && (
                                    <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-xl text-center text-sm backdrop-blur-md animate-pulse">
                                            {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-3 rounded-xl text-center text-sm backdrop-blur-md animate-in fade-in zoom-in duration-300">
                                        {success}
                                    </div>
                                )}
                            </form>
                        </div>

                    ) : selectedTab == 'privacidade' ? (
                        <div className="p-12 animate-in fade-in slide-in-from-right-10 duration-500 overflow-y-auto h-full custom-scrollbar">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                    Segurança da Conta
                                </h2>
                                <p className="text-purple-400 mt-2">Gerencie suas credenciais de acesso à estação.</p>
                            </div>

                            <form className="space-y-6 max-w-2xl border-b border-white/10 pb-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">Senha Atual</label>
                                    <input 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
                                        <input 
                                            type="password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
                                            placeholder="Nova senha"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
                                            placeholder="Repita a nova senha"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={triggerUpdate}
                                    type="submit"
                                    className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all active:scale-95"
                                >
                                    Atualizar Senha
                                </button>
                                {error && (
                                    <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-xl text-center text-sm backdrop-blur-md animate-pulse">
                                            {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-3 rounded-xl text-center text-sm backdrop-blur-md animate-in fade-in zoom-in duration-300">
                                        {success}
                                    </div>
                                )}
                            </form>

                            <div className="mt-10">
                                <h3 className="text-red-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">Zona de Perigo</h3>
                                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold">Encerrar Missão</p>
                                        <p className="text-gray-400 text-sm">Uma vez deletada, sua conta e dados na Órbita não poderão ser recuperados.</p>
                                    </div>
                                    <button
                                        onClick={triggerDelete}
                                        className="cursor-pointer bg-transparent border border-red-500/50 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2 rounded-full transition-all text-sm font-bold"
                                    >
                                        Deletar Conta
                                    </button>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="p-12 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white">Configurações da Estação</h2>
                                <p className="text-purple-400">Personalize sua interface e experiência na órbita.</p>
                            </div>

                            <div className="space-y-6 max-w-2xl">
                                <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <div>
                                        <p className="text-white font-bold">Alertas da Órbita</p>
                                        <p className="text-gray-400 text-sm">Receba notificações sobre atualizações de suas tarefas.</p>
                                    </div>
                                    <button 
                                        onClick={() => setNotifications(!notifications)}
                                        className={`cursor-pointer w-14 h-8 rounded-full transition-all duration-300 relative ${notifications ? 'bg-purple-600' : 'bg-gray-600'}`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${notifications ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400 uppercase tracking-widest ml-1">Idioma da Interface</label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition-all cursor-pointer appearance-none">
                                        <option value='pt-br' className="bg-gray-900">Português (Brasil)</option>
                                        <option value='en' className="bg-gray-900">English (Space Center)</option>
                                    </select>
                                </div>

                                <div className="pt-6">
                                    <button
                                        onClick={saveSettings}
                                        className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] active:scale-95"
                                    >
                                        Aplicar Configurações
                                    </button>
                                </div>

                                {success && (
                                    <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-3 rounded-xl text-center text-sm backdrop-blur-md animate-in fade-in zoom-in duration-300">
                                        {success}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal 
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
                type={modalConfig.type}
                onConfirm={modalConfig.action}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
        </main>
    )
}