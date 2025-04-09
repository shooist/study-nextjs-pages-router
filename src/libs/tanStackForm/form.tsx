import {
  createFormHook,
  useStore as useFormStore
} from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import TextField from '@/components/ui/TextField/TextField'
import { SubscribeButton } from '@/components/ui/SubscribeButton/SubscribeButton'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField
  },
  formComponents: {
    SubscribeButton
  },
  fieldContext,
  formContext,
})

export const useStore = useFormStore
