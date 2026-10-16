import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function TumbleTrailPrivacyPolicyPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('tumble-trail', 'privacy-policy', 'en'),
    lang: 'en',
    path: '/games/tumble-trail/privacy-policy',
    alternatePath: '/games/tumble-trail/gizlilik-politikasi',
    gameTitle: 'Tumble Trail 4x4',
    gamePath: '/games/tumble-trail',
    description: 'Privacy policy for Tumble Trail 4x4.',
  },
})
