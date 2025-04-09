import * as React from 'react'
import { useAppForm, withForm } from '@/libs/tanStackForm/form'
import { formOptions } from '@tanstack/react-form'


const formOpts = formOptions({
  defaultValues: {
    firstName: 'John',
    lastName: 'Doe',
    bloodType: 'A',
  },
})

const ChildForm = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  ...formOpts,
  // Optional, but adds props to the `render` function in addition to `form`
  props: {
    // These props are also set as default values for the `render` function
    title: 'Child Form',
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField
          name="firstName"
        >
          {(field) => <field.TextField label="First Name" />}
        </form.AppField>

        <form.AppField
          name="lastName"
        >
          {(field) => <field.TextField label="Last Name" />}
        </form.AppField>

        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    )
  },
})

const ChildForm2 = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  ...formOpts,
  // Optional, but adds props to the `render` function in addition to `form`
  props: {
    // These props are also set as default values for the `render` function
    title: 'Child Form',
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField
          name="bloodType"
        >
          {(field) => <field.TextField label="Blood Type" />}
        </form.AppField>

        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    )
  },
})

export default function TanStackSplitSample() {
  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log("onSubmit", { value })
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  })

  return (
    <div className="">
      <h1>title: TanStackSplitSample withFormを使った子コンポーネントへのコード分割の例</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <ChildForm form={form} title={'ChildForm1'} />
        <ChildForm2 form={form} title={'ChildForm2'} />
      </form>
    </div>
  )
}
