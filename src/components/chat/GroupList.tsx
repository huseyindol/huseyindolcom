import { useVisitorGroups } from '@/hooks/chat/useVisitorGroups'
import { ChatGroup } from '@/types/chat'
import { MessageCircle } from 'lucide-react'

export function GroupList({ onSelect }: { onSelect: (g: ChatGroup) => void }) {
  const { groups, loading, error } = useVisitorGroups()

  if (loading)
    return <p className="p-4 text-sm text-muted-foreground">Yükleniyor…</p>
  if (error) return <p className="p-4 text-sm text-destructive">{error}</p>
  if (!groups || groups.length === 0)
    return (
      <p className="p-4 text-sm text-muted-foreground">
        Şu an aktif bir destek konuşması yok.
      </p>
    )

  return (
    <ul className="h-full divide-y divide-border overflow-y-auto">
      {groups.map(g => (
        <li key={g.id}>
          <button
            onClick={() => onSelect(g)}
            className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted"
          >
            <span className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {g.name || 'Destek'}
              </span>
              {g.description && (
                <span className="block truncate text-xs text-muted-foreground">
                  {g.description}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
