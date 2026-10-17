import { isFieldVisible } from '@/lib/form/condition-evaluator'
import {
  generateDefaultValues,
  generateZodSchema,
} from '@/lib/form/zod-generator'
import type { FormSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormButton } from './FormButton'
import { FormFieldRenderer } from './FormFieldRenderer'
import { FormLayout } from './layout/FormLayout'

interface DynamicFormRendererProps {
  readonly formSchema: FormSchema
  readonly onSubmit?: (data: Record<string, unknown>) => Promise<void>
}

export function DynamicFormRenderer({
  formSchema,
  onSubmit,
}: DynamicFormRendererProps) {
  const { config, fields, steps: rawSteps } = formSchema.schema

  const steps = useMemo(() => {
    if (rawSteps && rawSteps.length > 0) return rawSteps

    if (config.layout === 'wizard') {
      const uniqueStepIds = [
        ...new Set(fields.map(f => f.stepId).filter(Boolean)),
      ] as string[]
      if (uniqueStepIds.length > 0) {
        return uniqueStepIds.map((id, index) => ({
          id,
          title: `Adım ${index + 1}`,
          description: undefined,
        }))
      }
    }
    return rawSteps ?? []
  }, [rawSteps, config.layout, fields])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const isWizard = config.layout === 'wizard' && steps.length > 0
  const currentStep = isWizard ? steps[currentStepIndex] : null

  const defaultValues = useMemo(() => generateDefaultValues(fields), [fields])
  const zodSchema = useMemo(() => generateZodSchema(fields), [fields])

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const { handleSubmit, trigger } = methods

  const visibleFields = useMemo(() => {
    if (!isWizard || !currentStep) return fields
    return fields.filter(field => field.stepId === currentStep.id)
  }, [fields, isWizard, currentStep])

  const handleNext = async () => {
    if (!currentStep) return
    const fieldIds = visibleFields.map(f => f.id)
    const isValid = await trigger(fieldIds)
    if (isValid) {
      setCurrentStepIndex(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onFormSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true)
    try {
      const cleanedData: Record<string, unknown> = {}
      for (const field of fields) {
        if (isFieldVisible(field, data)) {
          cleanedData[field.id] = data[field.id]
        }
      }
      if (onSubmit) {
        await onSubmit(cleanedData)
      }
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <FormLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Form başarıyla gönderildi!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Yanıtınız kaydedildi. Teşekkür ederiz.
          </p>
        </div>
      </FormLayout>
    )
  }

  const isLastStep =
    !isWizard || (steps && currentStepIndex === steps.length - 1)

  return (
    <FormLayout title={formSchema.title}>
      {isWizard && steps && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex
              const isCompleted = index < currentStepIndex

              const stepIndicatorClass =
                isActive || isCompleted
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted bg-background text-muted-foreground'

              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <div
                    className={`relative flex flex-col items-center ${
                      index === steps.length - 1 ? 'flex-none' : 'w-full'
                    }`}
                  >
                    <div className="flex w-full items-center">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${stepIndicatorClass}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 w-full flex-1 transition-colors ${
                            isCompleted ? 'bg-primary' : 'bg-muted'
                          }`}
                          style={{
                            marginLeft: '0.5rem',
                            marginRight: '0.5rem',
                          }}
                        />
                      )}
                    </div>
                    <span
                      className={`absolute top-10 hidden whitespace-nowrap text-xs font-medium transition-colors md:block ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center md:hidden">
            <h3 className="text-lg font-semibold text-foreground">
              {currentStep?.title}
            </h3>
            {currentStep?.description && (
              <p className="text-sm text-muted-foreground">
                {currentStep.description}
              </p>
            )}
          </div>
        </div>
      )}

      {isWizard && currentStep && (
        <div className="mb-6 hidden md:block">
          <h2 className="text-xl font-semibold">{currentStep.title}</h2>
          {currentStep.description && (
            <p className="text-muted-foreground">{currentStep.description}</p>
          )}
        </div>
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-5">
            {visibleFields.map(field => (
              <FormFieldRenderer key={field.id} field={field} />
            ))}
            {visibleFields.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                Bu adımda görüntülenecek alan yok.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-6">
            <div>
              {isWizard && currentStepIndex > 0 && (
                <FormButton
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Geri
                </FormButton>
              )}
            </div>

            <div className="flex gap-3">
              {!isLastStep ? (
                <FormButton
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                >
                  İleri
                  <ChevronRight className="ml-2 h-4 w-4" />
                </FormButton>
              ) : (
                <FormButton
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {config.submitLabel || 'Gönder'}
                </FormButton>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </FormLayout>
  )
}
