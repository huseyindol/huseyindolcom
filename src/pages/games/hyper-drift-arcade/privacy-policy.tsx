import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HyperDriftArcadePrivacyPolicyPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hyper-drift-arcade', 'privacy-policy', 'en'),
    lang: 'en',
    path: '/games/hyper-drift-arcade/privacy-policy',
    alternatePath: '/games/hyper-drift-arcade/gizlilik-politikasi',
    gameTitle: 'Hyper Drift: Arcade',
    gamePath: '/games/hyper-drift-arcade',
    description:
      'Privacy policy for Dough Master: Color Mix (Hyper Drift: Arcade).',
  },
})
