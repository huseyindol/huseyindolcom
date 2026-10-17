import {
  ContentItem,
  ContentListResponse,
  SectionData,
  SectionInfo,
} from '@/types/content'
import { fetcher } from '@/utils/services/fetcher'

/**
 * Site-side content fetcher - getStaticProps / getServerSideProps içinde kullanılır
 * API'den section key'e göre içerikleri çeker
 */
export async function getContentsBySectionKey<T = Record<string, unknown>>(
  sectionKey: string,
): Promise<T[]> {
  try {
    const data = await fetcher<ContentListResponse<T>>(
      `/contents/section/${sectionKey}`,
      {
        method: 'GET',
      },
    )

    if (!data.result) {
      console.error(`API error for section ${sectionKey}`)
      return []
    }

    // metadata alanından type'a göre dönüştür
    return data.data
      .filter(item => item.basicInfo?.isActive)
      .sort(
        (a, b) => (a.basicInfo?.sortOrder ?? 0) - (b.basicInfo?.sortOrder ?? 0),
      )
      .map(item => item.metadata as T)
  } catch (error) {
    console.error(`Error fetching contents for section ${sectionKey}:`, error)
    return []
  }
}

/**
 * Site-side content fetcher - Tam ContentItem döndürür
 * Metadata dışındaki alanlara da ihtiyaç varsa kullanılır
 */
export async function getContentItemsBySectionKey<T = Record<string, unknown>>(
  sectionKey: string,
): Promise<ContentItem<T>[]> {
  try {
    const data = await fetcher<ContentListResponse<T>>(
      `/contents/section/${sectionKey}`,
      {
        method: 'GET',
      },
    )

    if (!data.result) {
      console.error(`API error for section ${sectionKey}`)
      return []
    }

    return data.data
      .filter(item => item.basicInfo?.isActive)
      .sort(
        (a, b) => (a.basicInfo?.sortOrder ?? 0) - (b.basicInfo?.sortOrder ?? 0),
      )
  } catch (error) {
    console.error(`Error fetching contents for section ${sectionKey}:`, error)
    return []
  }
}

/**
 * Site-side section data fetcher - getStaticProps / getServerSideProps içinde kullanılır
 * Section bilgisi (title, description) + item listesi döndürür
 * İlk aktif item'dan title ve description alınır
 */
export async function getSectionDataBySectionKey<T = Record<string, unknown>>(
  sectionKey: string,
  defaultSectionInfo?: SectionInfo,
): Promise<SectionData<T>> {
  const defaultInfo: SectionInfo = defaultSectionInfo || {
    title: '',
    description: '',
  }

  try {
    const data = await fetcher<ContentListResponse<T>>(
      `/contents/section/${sectionKey}`,
      {
        method: 'GET',
      },
    )

    if (!data.result || !data.data?.length) {
      console.error(`API error or empty data for section ${sectionKey}`)
      return { sectionInfo: defaultInfo, items: [] }
    }

    // Aktif ve sıralı item'ları al
    const sortedItems = data.data
      .filter(item => item.basicInfo?.isActive)
      .sort(
        (a, b) => (a.basicInfo?.sortOrder ?? 0) - (b.basicInfo?.sortOrder ?? 0),
      )

    // İlk item'dan section bilgisini al
    const firstItem = sortedItems[0]
    const sectionInfo: SectionInfo = firstItem
      ? {
          title: firstItem.basicInfo?.title || defaultInfo.title,
          description:
            firstItem.basicInfo?.description || defaultInfo.description,
        }
      : defaultInfo

    // Metadata array'i olarak döndür
    const items = sortedItems.map(item => item.metadata as T)

    return { sectionInfo, items }
  } catch (error) {
    console.error(`Error fetching section data for ${sectionKey}:`, error)
    return { sectionInfo: defaultInfo, items: [] }
  }
}
