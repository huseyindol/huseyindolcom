import Script from 'next/script'
import { useEffect } from 'react'
import { GAME_ASSET_CACHE_KEY } from '../../../lib/game-asset-version.generated'

export default function GameComponent() {
  useEffect(() => {
    // Cleanup game instance if needed when component unmounts
    return () => {
      const gameDiv = document.getElementById('game')
      if (gameDiv) {
        gameDiv.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#1a1a1a]">
      {/* Phaser oyununun yükleneceği ana div. id="game" olması index-CVqOXm-z.js içinde parent:"game" olarak belirtildiği için zorunludur. */}
      <div id="game" className="overflow-hidden shadow-2xl" />

      {/* Oyunun derlenmiş (Vite) module dosyası. type="module" olarak yüklenmeli. */}
      <Script
        src={`/assets/games/overtakeandparking/game.js?v=${GAME_ASSET_CACHE_KEY}`}
        type="module"
        strategy="lazyOnload"
      />
    </div>
  )
}
