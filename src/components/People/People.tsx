
import { useAppForm } from '@/libs/tanStackForm/form'
import { AddressFields } from './address-fields'
import { peopleFormOpts } from './shared-form'

export const PeoplePage = () => {
  const form = useAppForm({
    ...peopleFormOpts,
    // validators: {
    //   onChange: ({ value }) => {
    //     const errors = {
    //       fields: {},
    //     } as {
    //       fields: Record<string, string>
    //     }
    //     if (!value.fullName) {
    //       errors.fields.fullName = 'Full name is required'
    //     }
    //     if (!value.phone) {
    //       errors.fields.phone = 'Phone is required'
    //     }
    //     if (!value.emergencyContact.fullName) {
    //       errors.fields['emergencyContact.fullName'] =
    //         'Emergency contact full name is required'
    //     }
    //     if (!value.emergencyContact.phone) {
    //       errors.fields['emergencyContact.phone'] =
    //         'Emergency contact phone is required'
    //     }

    //     return errors
    //   },
    // },
    onSubmit: ({ value }) => {
      console.log("onSubmit", {value})
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <h1>Personal Information</h1>
      <form.AppField name="fullName">{(field) => <field.TextField label="Full Name" />}</form.AppField>
      <form.AppField name="email">{(field) => <field.TextField label="Email" />}</form.AppField>
      <form.AppField name="phone">{(field) => <field.TextField label="Phone" />}</form.AppField>

      <AddressFields form={form} title={'foo'} />

      <h2>Emergency Contact</h2>
      <form.AppField name="emergencyContact.fullName">{(field) => <field.TextField label="Full Name" />}</form.AppField>
      <form.AppField name="emergencyContact.phone">{(field) => <field.TextField label="Phone" />}</form.AppField>

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  )
}