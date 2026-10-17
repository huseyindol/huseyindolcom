import { PageResponseType } from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// GET - Tek sayfa getir (slug ile) — site tarafı için (getServerSideProps / getStaticProps)
//
// Dönüş:
//  - PageResponseType → sayfa bulundu
//  - null             → sayfa CMS'te yok (result=false). BEKLENEN durum (örn. /arcade gibi
//                       CMS kaydı olmayan sayfalar), hata DEĞİL → loglanmaz.
//  - throw            → gerçek hata (network/parse). Loglanır ve yukarı fırlatılır.
export const getPageBySlugService = async (
  slug: string,
): Promise<PageResponseType | null> => {
  let response: PageResponseType
  try {
    response = await fetcher(`/pages/${slug}`, {
      method: 'GET',
    })
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error)
    throw error
  }

  if (!response.result) {
    // Sayfa yok — beklenen durum, sessizce null dön
    return null
  }
  return response
}
