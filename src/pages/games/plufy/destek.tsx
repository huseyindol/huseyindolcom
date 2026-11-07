import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function PlufyDestekPage(props: Readonly<GameDocPageProps>) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('plufy', 'support', 'tr'),
    lang: 'tr',
    path: '/games/plufy/destek',
    alternatePath: '/games/plufy/support',
    gameTitle: "Plufy'nin Dünyası",
    gamePath: '/games/plufy',
    description: "Plufy'nin Dünyası destek ve sık sorulan sorular.",
  },
})
