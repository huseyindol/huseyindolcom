import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HyperDriftArcadeSupportPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hyper-drift-arcade', 'support', 'en'),
    lang: 'en',
    path: '/games/hyper-drift-arcade/support',
    alternatePath: '/games/hyper-drift-arcade/destek',
    gameTitle: 'Hyper Drift: Arcade',
    gamePath: '/games/hyper-drift-arcade',
    description:
      'Support and FAQ for Dough Master: Color Mix (Hyper Drift: Arcade).',
  },
})
