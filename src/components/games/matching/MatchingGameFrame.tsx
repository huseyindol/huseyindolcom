import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { GAME_GE_ASSET_CACHE_KEY } from '../../../lib/game-ge-asset-version.generated'

type WebKitDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
}

type WebKitHTMLElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>
}

function getActiveFullscreenElement(): Element | null {
  const doc = document as WebKitDocument
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

function subscribeFullscreen(onStoreChange: () => void) {
  document.addEventListener('fullscreenchange', onStoreChange)
  document.addEventListener('webkitfullscreenchange', onStoreChange)
  return () => {
    document.removeEventListener('fullscreenchange', onStoreChange)
    document.removeEventListener('webkitfullscreenchange', onStoreChange)
  }
}

function getFullscreenElementSnapshot() {
  return getActiveFullscreenElement()
}

function getServerFullscreenSnapshot() {
  return null
}

async function enterDomFullscreen(el: HTMLElement) {
  const node = el as WebKitHTMLElement
  if (typeof el.requestFullscreen === 'function') {
    await el.requestFullscreen()
    return
  }
  if (typeof node.webkitRequestFullscreen === 'function') {
    await node.webkitRequestFullscreen()
    return
  }
  throw new Error('Fullscreen API yok')
}

async function exitDomFullscreen() {
  const doc = document as WebKitDocument
  if (typeof document.exitFullscreen === 'function') {
    await document.exitFullscreen()
    return
  }
  if (typeof doc.webkitExitFullscreen === 'function') {
    await doc.webkitExitFullscreen()
    return
  }
}

export function MatchingGameFrame() {
  const [shellEl, setShellEl] = useState<HTMLDivElement | null>(null)
  const [pseudoFullscreen, setPseudoFullscreen] = useState(false)
  const fsEl = useSyncExternalStore(
    subscribeFullscreen,
    getFullscreenElementSnapshot,
    getServerFullscreenSnapshot,
  )

  const nativeFullscreen = shellEl !== null && fsEl !== null && fsEl === shellEl
  const isFullscreen = nativeFullscreen || pseudoFullscreen

  useEffect(() => {
    if (!pseudoFullscreen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPseudoFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [pseudoFullscreen])

  const toggleFullscreen = useCallback(async () => {
    const el = shellEl
    if (!el) return

    if (isFullscreen) {
      if (pseudoFullscreen) setPseudoFullscreen(false)
      else {
        try {
          await exitDomFullscreen()
        } catch {
          setPseudoFullscreen(false)
        }
      }
      return
    }

    try {
      await enterDomFullscreen(el)
      setPseudoFullscreen(false)
    } catch {
      setPseudoFullscreen(true)
    }
  }, [shellEl, isFullscreen, pseudoFullscreen])

  return (
    <div
      ref={setShellEl}
      className={cn(
        'relative z-0 flex w-full flex-col overflow-hidden rounded-xl border border-border bg-black shadow-2xl',
        isFullscreen &&
          cn(
            'h-dvh max-h-dvh min-h-0 w-full max-w-none rounded-none border-0 shadow-none',
            'max-md:pb-[max(env(safe-area-inset-bottom,0px),0px)] max-md:pt-[calc(env(safe-area-inset-top,0px)+10px)]',
            'md:pb-[env(safe-area-inset-bottom,0px)] md:pt-[env(safe-area-inset-top,0px)]',
          ),
        pseudoFullscreen && 'z-200 fixed inset-0',
      )}
    >
      <div className="pointer-events-none absolute bottom-2 right-2 z-10 max-[480px]:bottom-[max(0.5rem,env(safe-area-inset-bottom))] md:bottom-3 md:right-3">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={toggleFullscreen}
          className="pointer-events-auto shadow-md"
          aria-pressed={isFullscreen}
          aria-label={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekran'}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4 shrink-0" aria-hidden />
          ) : (
            <Maximize2 className="size-4 shrink-0" aria-hidden />
          )}
        </Button>
      </div>

      <iframe
        title="Eğitici Eşleştirme Oyunu"
        src={`/assets/games/matching/index.html?v=${GAME_GE_ASSET_CACHE_KEY}`}
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
        className={cn(
          'w-full border-0',
          isFullscreen
            ? 'min-h-0 flex-1 basis-0'
            : 'h-[min(92dvh,580px)] shrink-0',
        )}
        loading="lazy"
      />
    </div>
  )
}
