import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function PlufyGizlilikPage(props: Readonly<GameDocPageProps>) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('plufy', 'privacy-policy', 'tr'),
    lang: 'tr',
    path: '/games/plufy/gizlilik-politikasi',
    alternatePath: '/games/plufy/privacy-policy',
    gameTitle: "Plufy'nin Dünyası",
    gamePath: '/games/plufy',
    description: "Plufy'nin Dünyası gizlilik politikası.",
  },
})
