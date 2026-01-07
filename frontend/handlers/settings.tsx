"use client"
import { useState, useEffect } from "react"

export function useSettings() {
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

  useEffect(() => {
    localStorage.setItem('orbit_notifications', String(notifications))
    localStorage.setItem('orbit_language', language)
    document.documentElement.lang = language
  }, [notifications, language])

  return { notifications, setNotifications, language, setLanguage }

}