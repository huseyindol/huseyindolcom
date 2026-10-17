import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { ChatPanel } from './ChatPanel'

export function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating buton — sağ alt */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Destek sohbeti"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/20 transition-all hover:scale-105 ${
          open
            ? 'pointer-events-none scale-0 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sağdan kayan chat drawer */}
      <aside
        role="dialog"
        aria-label="Destek sohbeti"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-border bg-card text-card-foreground shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {open && <ChatPanel onClose={() => setOpen(false)} />}
      </aside>
    </>
  )
}
