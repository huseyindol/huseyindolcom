import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function TumbleTrailDestekPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('tumble-trail', 'support', 'tr'),
    lang: 'tr',
    path: '/games/tumble-trail/destek',
    alternatePath: '/games/tumble-trail/support',
    gameTitle: 'Tumble Trail 4x4',
    gamePath: '/games/tumble-trail',
    description: 'Tumble Trail 4x4 destek ve sık sorulan sorular.',
  },
})
