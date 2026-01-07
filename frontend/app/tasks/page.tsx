"use client"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { Modal } from "@/components/ui/modal"
import { TaskCommandCenter } from "@/components/sections/tasks/command-center"
import { TaskCommandCenterEn } from "@/components/sections/tasks/command-centeren"
import { TaskFormModal } from "@/components/ui/task-form-modal"

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [language, setLanguage] = useState<'pt-br' | 'en'>('pt-br')
  const [mounted, setMounted] = useState(false)

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const decoded: any = jwtDecode(token)
      const response = await axios.get(`v1/tasks/user/${decoded.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data)
    } catch (error) {
      console.error("Erro orbital ao escanear tarefas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    setEditingTask({
      title: "",
      description: "",
      priority: "LOW",
      endAt: now.toISOString()
    })
    setIsFormModalOpen(true)
  }

  const handleOpenEdit = (task: any) => {
    setEditingTask(task)
    setIsFormModalOpen(true)
  }

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const decoded: any = jwtDecode(token!)
    const payload = { ...editingTask, userId: decoded.id }

    try {
      if (editingTask.id) {
        await axios.put(`v1/tasks/${editingTask.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`v1/tasks/create`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setIsFormModalOpen(false)
      fetchTasks()
    } catch (error) {
      console.error("Erro ao salvar missão")
    }
  }

  const handleToggleCompletion = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token')
      const decoded: any = jwtDecode(token!)
      await axios.patch(`v1/tasks/${taskId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}`, userId: decoded.id }
      })
      fetchTasks()
    } catch (error) {
      console.error("Erro ao alternar status")
    }
  }

  const executeDelete = async () => {
    if (!taskToDelete) return
    try {
      const token = localStorage.getItem('token')
      const decoded: any = jwtDecode(token!)
      await axios.delete(`v1/tasks/${taskToDelete}`, {
        headers: { Authorization: `Bearer ${token}`, userId: decoded.id }
      })
      setTasks(prev => prev.filter(t => t.id !== taskToDelete))
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error("Erro ao abortar missão")
    }
  }

  useEffect(() => {
    setMounted(true)
    const storedLang = localStorage.getItem('orbit_language') as 'pt-br' | 'en'
    if (storedLang) setLanguage(storedLang)
    fetchTasks()
  }, [])

  if (!mounted) return <div className="min-h-screen bg-black" />

  const content = {
    'pt-br': {
      title: "Central de Comando",
      totalHistory: "Histórico Total",
      missions: "Missões Concluídas",
      weekly: "Performance Semanal",
      window: "Alvos na Janela de 7 Dias",
      loading: "ESCANEANDO SETOR ORBITAL...",
      delTitle: "Confirmar Abortagem",
      delMsg: "Remover esta tarefa permanentemente do espaço?",
      delConfirm: "DELETAR"
    },
    'en': {
      title: "Command Center",
      totalHistory: "Total History",
      missions: "Completed Missions",
      weekly: "Weekly Performance",
      window: "Targets in 7-Day Window",
      loading: "SCANNING ORBITAL SECTOR...",
      delTitle: "Confirm Abort",
      delMsg: "Remove this task permanently from space?",
      delConfirm: "DELETE"
    }
  }[language]

  const stats = {
    totalCompleted: tasks.filter((t) => t.completed).length,
    weeklyCompleted: tasks.filter((t) => {
      if (!t.completed || !t.endAt) return false
      const taskDate = new Date(t.endAt)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return taskDate >= sevenDaysAgo
    }).length
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 px-10 pb-20 text-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-extrabold mb-12 text-center">
            {content.title.split(' ')[0]} <span className="text-purple-600">{content.title.split(' ')[1]}</span> <span className="text-purple-600">{content.title.split(' ')[2]}</span>
          </h1>

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center">
                <span className="text-gray-500 text-[10px] font-mono tracking-[0.4em] uppercase">{content.totalHistory}</span>
                <h2 className="text-6xl font-black text-white mt-2">{stats.totalCompleted}</h2>
                <p className="text-purple-500 text-xs font-bold mt-2 font-mono uppercase">{content.missions}</p>
              </div>

              <div className="bg-purple-600/10 border border-purple-500/20 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center">
                <span className="text-purple-400 text-[10px] font-mono tracking-[0.4em] uppercase">{content.weekly}</span>
                <h2 className="text-6xl font-black text-white mt-2">{stats.weeklyCompleted}</h2>
                <p className="text-gray-400 text-xs font-bold mt-2 font-mono uppercase">{content.window}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="h-[400px] flex items-center justify-center animate-pulse font-mono text-purple-500 italic tracking-widest text-xl">
              {content.loading}
            </div>
          ) : (
            language === 'en' ? (
              <TaskCommandCenterEn
                tasks={tasks} 
                onDelete={(id: string) => { setTaskToDelete(id); setIsDeleteModalOpen(true) }} 
                onUpdate={handleOpenEdit} 
                onCreate={handleOpenCreate} 
                onToggle={handleToggleCompletion} 
              />
            ) : (
              <TaskCommandCenter 
                tasks={tasks} 
                onDelete={(id: string) => { setTaskToDelete(id); setIsDeleteModalOpen(true) }} 
                onUpdate={handleOpenEdit} 
                onCreate={handleOpenCreate} 
                onToggle={handleToggleCompletion} 
              />
            )
          )}
        </div>

        <Modal
          isOpen={isDeleteModalOpen}
          title={content.delTitle}
          message={content.delMsg}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={executeDelete}
          type="danger"
          confirmText={content.delConfirm}
        />

        <TaskFormModal 
          isOpen={isFormModalOpen}
          task={editingTask}
          setTask={setEditingTask}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveTask}
        />
      </main>
      <Footer />
    </>
  )
}