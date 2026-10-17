import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// --- Easing functions ---
export const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}) {
  return (t: number) => {
    if (t <= start) return from
    if (t >= end) return to
    const local = (t - start) / (end - start)
    return from + (to - from) * ease(local)
  }
}

// --- Contexts ---
const TimelineContext = createContext({
  time: 0,
  duration: 10,
  playing: false,
  setTime: (_t: number) => {},
  setPlaying: (_p: boolean) => {},
})

export const useTime = () => useContext(TimelineContext).time
export const useTimeline = () => useContext(TimelineContext)

const SpriteContext = createContext({
  localTime: 0,
  progress: 0,
  duration: 0,
  visible: false,
})
export const useSprite = () => useContext(SpriteContext)

// --- Components ---
type SpriteCtx = {
  localTime: number
  progress: number
  duration: number
  visible: boolean
}

interface SpriteProps {
  start?: number
  end?: number
  children: React.ReactNode | ((ctx: SpriteCtx) => React.ReactNode)
  keepMounted?: boolean
}

export function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false,
}: SpriteProps) {
  const { time } = useTimeline()
  const visible = time >= start && time <= end
  const duration = end - start
  const localTime = Math.max(0, time - start)
  const progress =
    duration > 0 && Number.isFinite(duration)
      ? clamp(localTime / duration, 0, 1)
      : 0

  const value = useMemo(
    () => ({ localTime, progress, duration, visible }),
    [localTime, progress, duration, visible],
  )

  if (!visible && !keepMounted) return null

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  )
}

interface StageProps {
  width?: number
  height?: number
  duration?: number
  background?: string
  autoplay?: boolean
  loop?: boolean
  children: React.ReactNode
}

export function Stage({
  width = 1920,
  height = 1080,
  duration = 10,
  background = '#0d0e12',
  autoplay = true,
  loop = true,
  children,
}: StageProps) {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [scale, setScale] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const lastTsRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - 60) / height,
      )
      setScale(Math.max(0.05, s))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [width, height])

  useEffect(() => {
    if (!playing) {
      lastTsRef.current = null
      return
    }
    const step = (ts: number) => {
      lastTsRef.current ??= ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      setTime(t => {
        let next = t + dt
        if (next >= duration) {
          if (loop) next = next % duration
          else {
            next = duration
            setPlaying(false)
          }
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [playing, duration, loop])

  const ctxValue = useMemo(
    () => ({ time, duration, playing, setTime, setPlaying }),
    [time, duration, playing],
  )

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 flex flex-col items-center overflow-hidden bg-[#050608]"
    >
      <div className="flex w-full flex-1 items-center justify-center overflow-hidden">
        <div
          style={{
            width,
            height,
            background,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
          className="relative shrink-0 overflow-hidden shadow-2xl"
        >
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>
      <PlaybackBar
        time={time}
        duration={duration}
        playing={playing}
        onToggle={() => setPlaying(!playing)}
        onSeek={setTime}
      />
    </div>
  )
}

interface PlaybackBarProps {
  time: number
  duration: number
  playing: boolean
  onToggle: () => void
  onSeek: (t: number) => void
}

function PlaybackBar({
  time,
  duration,
  playing,
  onToggle,
  onSeek,
}: PlaybackBarProps) {
  const fmt = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    const ms = Math.floor((t % 1) * 100)
    return `${m}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
  }

  return (
    <div className="mb-2 flex h-14 w-full max-w-3xl items-center gap-4 rounded-xl border-t border-white/5 bg-[#0d0e12]/80 px-6 font-mono text-xs text-white/70 backdrop-blur">
      <button
        onClick={onToggle}
        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          style={{ width: `${(time / duration) * 100}%` }}
          className="absolute inset-y-0 left-0 bg-violet-500"
        />
        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={time}
          onChange={e => onSeek(parseFloat(e.target.value))}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
      <div className="w-20 text-right tabular-nums">
        {fmt(time)} / {fmt(duration)}
      </div>
    </div>
  )
}
