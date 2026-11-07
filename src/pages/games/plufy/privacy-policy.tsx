import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function PlufyPrivacyPolicyPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('plufy', 'privacy-policy', 'en'),
    lang: 'en',
    path: '/games/plufy/privacy-policy',
    alternatePath: '/games/plufy/gizlilik-politikasi',
    gameTitle: "Plufy'nin Dünyası",
    gamePath: '/games/plufy',
    description: "Privacy policy for Plufy's World (Plufy'nin Dünyası).",
  },
})
