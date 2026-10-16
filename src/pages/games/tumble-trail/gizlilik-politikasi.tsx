import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function TumbleTrailGizlilikPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('tumble-trail', 'privacy-policy', 'tr'),
    lang: 'tr',
    path: '/games/tumble-trail/gizlilik-politikasi',
    alternatePath: '/games/tumble-trail/privacy-policy',
    gameTitle: 'Tumble Trail 4x4',
    gamePath: '/games/tumble-trail',
    description: 'Tumble Trail 4x4 gizlilik politikası.',
  },
})
