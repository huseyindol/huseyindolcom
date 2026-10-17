import Image from 'next/image'
import { ImageOffIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  width = 1200,
  height = 630,
}: Readonly<Props>) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <span
        className="aspect-1200/630 my-8 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
        role="img"
        aria-label={`Görsel yüklenemedi: ${alt}`}
      >
        <ImageOffIcon className="h-8 w-8 opacity-60" aria-hidden />
        <span>Görsel yüklenemedi</span>
      </span>
    )
  }

  return (
    <span className="relative my-8 block w-full overflow-hidden rounded-xl bg-slate-100 shadow-xl dark:bg-slate-800">
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full object-cover"
        onError={() => setHasError(true)}
      />
    </span>
  )
}
