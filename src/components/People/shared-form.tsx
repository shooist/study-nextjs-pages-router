import { formOptions } from '@tanstack/react-form'

export const peopleFormOpts = formOptions({
  defaultValues: {
    fullName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    emergencyContact: {
      fullName: '',
      phone: '',
    },
  },
})

export const initialValues = {
  fullName: 'hoge',
  email: 'foo',
  phone: 'baz',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  },
  emergencyContact: {
    fullName: '',
    phone: '',
  },
}