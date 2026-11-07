import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function PlufySupportPage(props: Readonly<GameDocPageProps>) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('plufy', 'support', 'en'),
    lang: 'en',
    path: '/games/plufy/support',
    alternatePath: '/games/plufy/destek',
    gameTitle: "Plufy'nin Dünyası",
    gamePath: '/games/plufy',
    description: "Support and FAQ for Plufy's World (Plufy'nin Dünyası).",
  },
})
