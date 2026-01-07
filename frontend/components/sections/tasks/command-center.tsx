"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Edit3, ChevronRight, AlertCircle, X, Plus } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  priority: string
  endAt: string
  completed: boolean
}

interface Props {
  tasks: Task[]
  onDelete: (id: string) => void
  onUpdate: (task: Task) => void
  onCreate: () => void
}

export function TaskCommandCenter({ tasks, onDelete, onUpdate, onCreate }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState("ALL")

  const filteredTasks = tasks.filter(t => filter === "ALL" || t.priority === filter)

  const handleAbort = (id: string) => {
    onDelete(id)
    setSelectedTask(null)
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-[600px]">
      
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex gap-4">
          {["ALL", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer tracking-widest ${
                filter === p ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {p === "ALL" ? "TODAS" : p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onCreate}
            className="flex items-center gap-2 bg-white text-black hover:bg-purple-500 hover:text-white px-5 py-2 rounded-xl text-[10px] font-black transition-all active:scale-95 cursor-pointer uppercase tracking-tighter"
          >
            <Plus className="w-4 h-4" /> Nova Missão
          </button>
          <span className="text-gray-500 text-sm font-mono uppercase tracking-tighter hidden md:block">
              {filteredTasks.length} unidades em radar
          </span>
        </div>
      </div>

      <div className="flex gap-6 h-full overflow-hidden">
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layoutId={task.id}
              onClick={() => setSelectedTask(task)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                selectedTask?.id === task.id 
                ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.1)]' 
                : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${
                  task.priority === 'HIGH' ? 'text-red-500 bg-red-500' : 
                  task.priority === 'MEDIUM' ? 'text-yellow-500 bg-yellow-500' : 'text-blue-500 bg-blue-500'
                }`} />
                <div>
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{task.title}</h3>
                  <p className="text-[10px] text-gray-500 font-mono italic">ESTAÇÃO: {task.id.substring(0,8)}</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${selectedTask?.id === task.id ? 'rotate-90 text-purple-500' : 'text-gray-600'}`} />
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedTask ? (
            <motion.div
              key="details"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              className="w-96 bg-gray-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500/20 animate-scan" />

              <div className="flex-1">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[9px] bg-purple-600/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-black uppercase tracking-[0.2em]">
                    Telemetria Ativa
                  </span>
                  <button 
                    onClick={() => setSelectedTask(null)} 
                    className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight tracking-tighter">{selectedTask.title}</h2>
                
                <div className="space-y-6">
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                    <p className="text-gray-500 text-[9px] uppercase font-mono mb-3 tracking-widest flex items-center gap-2">
                      <AlertCircle className="w-3 h-3" /> Log de Descrição
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed italic font-light">
                      {selectedTask.description || "Nenhum dado adicional na caixa preta desta unidade."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-purple-500/20 transition-all">
                      <p className="text-gray-500 text-[9px] uppercase font-mono tracking-tighter">Prioridade</p>
                      <p className={`font-bold text-sm ${
                        selectedTask.priority === 'HIGH' ? 'text-red-500' : 'text-purple-400'
                      }`}>{selectedTask.priority}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-gray-500 text-[9px] uppercase font-mono tracking-tighter">Janela Final</p>
                      <p className="text-white font-bold text-sm">{new Date(selectedTask.endAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 mt-6">
                <button 
                  onClick={() => onUpdate(selectedTask)}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-purple-600 text-white p-4 rounded-2xl font-bold text-xs transition-all cursor-pointer group"
                >
                  <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" /> EDITAR
                </button>
                <button 
                  onClick={() => handleAbort(selectedTask.id)}
                  className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white p-4 rounded-2xl font-bold text-xs transition-all cursor-pointer border border-red-600/20"
                >
                  <Trash2 className="w-4 h-4" /> ABORTAR
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="w-96 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-gray-600 p-10 text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <AlertCircle className="w-12 h-12 mb-4 opacity-10" />
              </motion.div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Aguardando seleção de alvo...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}