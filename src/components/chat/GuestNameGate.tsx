import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormEvent, useState } from 'react'

export function GuestNameGate({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (name: string) => Promise<unknown>
  loading: boolean
  error: string | null
}) {
  const [name, setName] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2 || loading) return
    try {
      await onSubmit(name.trim())
    } catch {
      /* hata error prop'unda gösteriliyor */
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 p-4">
      <p className="text-sm text-muted-foreground">
        Sohbete başlamak için adınızı girin.
      </p>
      <div className="space-y-1">
        <Label htmlFor="guest-name">Adınız</Label>
        <Input
          id="guest-name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={80}
          placeholder="Adınız"
          autoFocus
        />
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
      <Button type="submit" disabled={name.trim().length < 2 || loading}>
        {loading ? 'Bağlanıyor…' : 'Başla'}
      </Button>
    </form>
  )
}
