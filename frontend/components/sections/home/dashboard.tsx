"use client"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { CheckCircle2, Circle, Plus, Target, Zap } from "lucide-react"

interface UserData {
  id: string
  usernameu: string
  email: string
}

interface Task {
  id: string
  title: string
  description: string
  priority: string
  completed: boolean
  endAt: string
}

export function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    startAt: "",
    endAt: ""
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = "/auth"
        return
      }
      const decoded = jwtDecode<UserData>(token)
      
      const [userResponse, tasksResponse] = await Promise.all([
        axios.get(`v1/users/${decoded.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`v1/tasks/user/${decoded.id}`, { headers: { Authorization: `Bearer ${token}` } })
      ])

      setUserData(userResponse.data)
      setTasks(tasksResponse.data)
    } catch (error) {
      console.error("Falha na sincronização:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(`v1/tasks/${taskId}/toggle`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          userId: userData?.id
        }
      })
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t))
    } catch (error) {
      console.error("Erro ao alternar status")
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
  
    try {
      const token = localStorage.getItem('token')
      
      let dateToSend = newTask.endAt
  
      if (dateToSend) {
        if (dateToSend.length === 10) {
          dateToSend = `${dateToSend}T23:59:59`
        } 
        else if (dateToSend.length === 16) {
          dateToSend = `${dateToSend}:00`
        }
      } else {
        dateToSend = new Date().toISOString().split("T")[0] + "T23:59:59"
      }
  
      const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        isCompleted: false,
        endAt: dateToSend,
        userId: userData?.id,
      }
  
      await axios.post('v1/tasks/create', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      setIsAdding(false)
      setNewTask({ title: "", description: "", priority: "MEDIUM", startAt: "", endAt: "" })
      fetchDashboardData()
    } catch (error: any) {
      setErrorMessage("Erro de telemetria: O formato da data é inválido.")
    }
  }

  const totalCompleted = tasks.filter(t => t.completed).length
  const weeklyCompleted = tasks.filter(t => {
    if (!t.completed || !t.endAt) return false
    const taskDate = new Date(t.endAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return taskDate >= sevenDaysAgo
  }).length

  useEffect(() => { fetchDashboardData() }, [])

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-purple-500 font-mono italic">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 mb-4"></div>
      SINCRONIZANDO ÓRBITA...
    </div>
  )

  return (
    <main className="pt-[160px] md:pt-[200px] min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto w-full">
        
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Painel de Comando</h1>
          <p className="text-purple-400 mt-2 font-mono uppercase text-sm tracking-widest">
            Comandante: {userData?.usernameu}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm group hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start">
              <p className="text-gray-400 text-xs font-mono uppercase tracking-tighter">Total em Órbita</p>
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-5xl font-black mt-4">{tasks.length}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm group hover:border-green-500/50 transition-all">
            <div className="flex justify-between items-start">
              <p className="text-gray-400 text-xs font-mono uppercase tracking-tighter">Missões Cumpridas</p>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-5xl font-black mt-4 text-green-400">{totalCompleted}</p>
          </div>

          <div className="bg-purple-600/10 border border-purple-500/20 p-8 rounded-3xl backdrop-blur-sm group hover:border-purple-400 transition-all">
            <div className="flex justify-between items-start">
              <p className="text-gray-400 text-xs font-mono uppercase tracking-tighter">Eficácia Semanal</p>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-5xl font-black mt-4 text-purple-300">{weeklyCompleted}</p>
          </div>
        </div>

        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full mb-10 bg-white/5 border-2 border-dashed border-white/10 p-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <Plus className="w-5 h-5 text-purple-500 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-sm tracking-widest uppercase">Adicionar Nova Missão ao Radar</span>
          </button>
        )}

        {isAdding && (
          <div className="mb-10 bg-white/5 border border-purple-500/30 p-8 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
             <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-500 rounded-full" /> 
                Configurar Unidade
             </h2>
             <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-mono text-gray-500 uppercase">Identificação</label>
                   <input 
                    placeholder="Ex: Refatorar Módulo de Propulsão"
                    className="bg-black/40 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none transition-all"
                    value={newTask.title}
                    onChange={e => setNewTask({...newTask, title: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-mono text-gray-500 uppercase">Nível de Prioridade</label>
                   <select 
                    className="bg-black/40 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none"
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="LOW">LOW (Rotina)</option>
                    <option value="MEDIUM">MEDIUM (Padrão)</option>
                    <option value="HIGH">HIGH (Crítico)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-[10px] font-mono text-gray-500 uppercase">Log de Detalhes</label>
                   <textarea 
                    placeholder="Descreva os objetivos secundários..."
                    className="bg-black/40 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none h-24"
                    value={newTask.description}
                    onChange={e => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-mono text-gray-500 uppercase">Data Final</label>
                   <input 
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-black/40 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none"
                    value={newTask.endAt}
                    onChange={e => setNewTask({...newTask, endAt: e.target.value})}
                  />
                </div>
                {errorMessage && (
                  <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/50 p-4 rounded-2xl animate-in fade-in slide-in-from-right-4">
                    <div className="bg-red-500 p-1 rounded-full">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-red-400 text-sm font-mono uppercase tracking-tighter">
                      {errorMessage}
                    </p>
                    <button 
                      onClick={() => setErrorMessage(null)}
                      className="ml-auto text-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="flex items-end gap-3">
                  <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-500 p-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 cursor-pointer">INICIAR</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="p-4 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer">CANCELAR</button>
                </div>
             </form>
          </div>
        )}

        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Objetivos em Radar
          </h2>
          
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-10 italic">Nenhum sinal detectado no radar...</p>
            ) : (
              tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    task.completed 
                    ? 'bg-green-500/5 border-green-500/20 opacity-60' 
                    : 'bg-white/5 border-white/10 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleToggleTask(task.id)}
                      className={`cursor-pointer transition-all ${task.completed ? 'text-green-500' : 'text-gray-500 hover:text-purple-500'}`}
                    >
                      {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>

                    <div>
                      <p className={`font-bold text-lg transition-all ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 font-mono tracking-tighter">{task.description || "Sem descrição de log"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                      task.priority === 'HIGH' ? 'border-red-500/30 text-red-500' : 
                      task.priority === 'MEDIUM' ? 'border-yellow-500/30 text-yellow-500' : 'border-blue-500/30 text-blue-500'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}