import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function TumbleTrailSupportPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('tumble-trail', 'support', 'en'),
    lang: 'en',
    path: '/games/tumble-trail/support',
    alternatePath: '/games/tumble-trail/destek',
    gameTitle: 'Tumble Trail 4x4',
    gamePath: '/games/tumble-trail',
    description: 'Support and FAQ for Tumble Trail 4x4.',
  },
})
