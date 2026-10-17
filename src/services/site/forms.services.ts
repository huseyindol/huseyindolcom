import {
  FormSchemaResponseType,
  FormSubmissionResponseType,
} from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// GET - Tek form getir (ID ile) — site tarafı için (getServerSideProps)
export const getFormByIdService = async (id: string) => {
  try {
    const response: FormSchemaResponseType = await fetcher(`/forms/${id}`, {
      method: 'GET',
    })
    if (!response.result) {
      throw new Error('Error get form', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get form:', error)
    throw error
  }
}

// POST - Form submit et — site tarafı için
export const submitFormService = async (
  formId: string,
  data: Record<string, unknown>,
) => {
  try {
    const response: FormSubmissionResponseType = await fetcher(
      `/forms/${formId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: data }),
      },
    )
    if (!response.result) {
      throw new Error('Error submitting form', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error submitting form:', error)
    throw error
  }
}
