import { publicChatApi } from '@/services/chat/publicChatApi'
import { ChatGroup } from '@/types/chat'
import { useEffect, useState } from 'react'

/**
 * visitorAccess=true destek gruplarını anonim public GET ile listeler.
 * `loading`: ilk yükleme (henüz veri/hata yok).
 */
export function useVisitorGroups() {
  const [groups, setGroups] = useState<ChatGroup[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    publicChatApi
      .listGroups()
      .then(g => {
        if (alive) setGroups(g)
      })
      .catch((e: unknown) => {
        if (alive)
          setError(e instanceof Error ? e.message : 'Gruplar yüklenemedi')
      })
    return () => {
      alive = false
    }
  }, [])

  return { groups, error, loading: groups === null && !error }
}
