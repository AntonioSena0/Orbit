"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function TaskFormModal({ isOpen, task, onClose, onSave, setTask }: any) {
  const [language, setLanguage] = useState('pt-br')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('orbit_language') || 'pt-br'
      setLanguage(stored)
    }
  }, [isOpen])

  if (!task) return null

  const content = {
    'pt-br': {
      header: "Telemetria da Unidade",
      title: "Título",
      desc: "Descrição",
      priority: "Prioridade",
      end: "Término",
      cancel: "CANCELAR",
      save: "SALVAR"
    },
    'en': {
      header: "Unit Telemetry",
      title: "Title",
      desc: "Description",
      priority: "Priority",
      end: "End Window",
      cancel: "CANCEL",
      save: "SAVE"
    }
  }[language === 'en' ? 'en' : 'pt-br']

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 border-2 border-purple-600 p-8 rounded-2xl max-w-2xl w-full shadow-[0_0_50px_rgba(147,51,234,0.3)] my-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-600 rounded-full inline-block" />
              {content.header}
            </h2>
            <form onSubmit={onSave} className="space-y-6">
              <div>
                <label className="text-gray-400 text-xs uppercase font-mono tracking-tighter">{content.title}</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white focus:border-purple-600 outline-hidden"
                  value={task.title}
                  onChange={e => setTask({...task, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase font-mono">{content.desc}</label>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white h-24 focus:border-purple-600 outline-hidden"
                  value={task.description}
                  onChange={e => setTask({...task, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase font-mono">{content.priority}</label>
                  <select 
                    className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white focus:border-purple-600 outline-hidden"
                    value={task.priority}
                    onChange={e => setTask({...task, priority: e.target.value})}
                  >
                    <option value="HIGH" className="bg-gray-900">HIGH</option>
                    <option value="MEDIUM" className="bg-gray-900">MEDIUM</option>
                    <option value="LOW" className="bg-gray-900">LOW</option>
                  </select>
                </div>
                <div>
                    <label className="text-gray-400 text-xs uppercase font-mono">{content.end}</label>
                    <input
                        type="datetime-local"
                        className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white focus:border-purple-600 outline-hidden"
                        defaultValue={task.endAt ? new Date(task.endAt).toISOString().slice(0, 16) : ""}
                        onChange={e => {
                          const val = e.target.value
                          if (val) {
                              const date = new Date(val)
                              if (!isNaN(date.getTime())) {
                                setTask({ ...task, endAt: date.toISOString() })
                              }
                          }
                        }}
                    />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="px-6 py-3 text-gray-400 hover:text-white cursor-pointer uppercase font-bold text-xs">
                  {content.cancel}
                </button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-purple-500/20 cursor-pointer text-xs">
                  {content.save}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}