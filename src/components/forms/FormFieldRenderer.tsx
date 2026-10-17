import { isFieldVisible } from '@/lib/form/condition-evaluator'
import type { Field } from '@/types/form'
import { useFormContext, useWatch } from 'react-hook-form'
import { CheckboxGroup } from './CheckboxGroup'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'
import { RadioGroup } from './RadioGroup'

interface FormFieldRendererProps {
  field: Field
}

export function FormFieldRenderer({ field }: Readonly<FormFieldRendererProps>) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  const dependentFieldId = field.condition?.field
  useWatch({ name: dependentFieldId ?? '' })

  if (field.condition) {
    const allValues = getValues()
    if (!isFieldVisible(field, allValues)) {
      return null
    }
  }

  const error = errors[field.id]?.message as string | undefined

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
    case 'url':
      return (
        <FormInput
          label={field.label}
          type={field.type === 'phone' ? 'tel' : field.type}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
    case 'number':
      return (
        <FormInput
          label={field.label}
          type="number"
          error={error}
          required={field.required}
          {...register(field.id, { valueAsNumber: true })}
        />
      )
    case 'date':
      return (
        <FormInput
          label={field.label}
          type="date"
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
    case 'textarea':
      return (
        <FormTextarea
          label={field.label}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
    case 'select':
      return (
        <FormSelect
          label={field.label}
          options={(field.options || []).map(o => ({
            label: o.label,
            value: o.value,
          }))}
          placeholder="Seçiniz..."
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
    case 'radio':
      return (
        <RadioGroup
          label={field.label}
          name={field.id}
          options={(field.options || []).map(o => ({
            label: o.label,
            value: o.value,
          }))}
          value={getValues(field.id)}
          onChange={val => setValue(field.id, val, { shouldValidate: true })}
          error={error}
          required={field.required}
        />
      )
    case 'multi_checkbox':
      return (
        <CheckboxGroup
          label={field.label}
          checked={getValues(field.id)}
          onChange={val => {
            setValue(field.id, val, { shouldValidate: true })
          }}
          name={field.id}
          error={error}
          options={(field.options || []).map(o => ({
            label: o.label,
            value: o.value,
          }))}
        />
      )
    case 'checkbox':
      return (
        <CheckboxGroup
          label={field.label}
          checked={getValues(field.id)}
          onChange={val => {
            setValue(field.id, val, { shouldValidate: true })
          }}
          name={field.id}
          error={error}
        />
      )
    default:
      return (
        <FormInput
          label={field.label}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
  }
}
