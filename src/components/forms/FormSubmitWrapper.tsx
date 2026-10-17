import { submitFormService } from '@/services/site/forms.services'
import { DynamicFormRenderer } from '@/components/forms/DynamicFormRenderer'
import type { FormSchema } from '@/types/form'

interface FormSubmitWrapperProps {
  formId: number
  schema: FormSchema
}

export function FormSubmitWrapper({
  formId,
  schema,
}: Readonly<FormSubmitWrapperProps>) {
  const handleSubmit = async (data: Record<string, unknown>) => {
    await submitFormService(String(formId), data)
  }

  return <DynamicFormRenderer formSchema={schema} onSubmit={handleSubmit} />
}
