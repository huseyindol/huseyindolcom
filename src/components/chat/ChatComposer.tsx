import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function ChatComposer({
  onSubmit,
  disabled,
  banned,
  onTyping,
}: {
  onSubmit: (content: string) => Promise<unknown> | void
  disabled?: boolean
  banned?: boolean
  onTyping?: () => void
}) {
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim() || sending || disabled) return
    setSending(true)
    try {
      await onSubmit(content.trim())
      setContent('')
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border p-2"
    >
      <Input
        type="text"
        value={content}
        onChange={e => {
          setContent(e.target.value)
          if (e.target.value.trim()) onTyping?.()
        }}
        placeholder={banned ? 'Yazma yetkiniz yok' : 'Mesajınızı yazın…'}
        disabled={sending || disabled}
        maxLength={4000}
        className="flex-1"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!content.trim() || sending || disabled}
        aria-label="Gönder"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
