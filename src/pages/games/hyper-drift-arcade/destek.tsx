import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HyperDriftArcadeDestekPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hyper-drift-arcade', 'support', 'tr'),
    lang: 'tr',
    path: '/games/hyper-drift-arcade/destek',
    alternatePath: '/games/hyper-drift-arcade/support',
    gameTitle: 'Hyper Drift: Arcade',
    gamePath: '/games/hyper-drift-arcade',
    description: 'Hyper Drift: Arcade destek ve sık sorulan sorular.',
  },
})
