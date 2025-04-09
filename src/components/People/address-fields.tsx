import { withForm } from '@/libs/tanStackForm/form'
import { peopleFormOpts } from './shared-form'

export const AddressFields = withForm({
  ...peopleFormOpts,
  props: {
    title: 'a',
  },
  render: ({ form, title }) => {
    console.log("title", title);
    
    return (
      <div>
        <h2>Address</h2>
        <form.AppField
          name="address.line1"
        >
          {(field) => <field.TextField label="Address Line 1" />}
        </form.AppField>
        <form.AppField
          name="address.line2"
        >
          {(field) => <field.TextField label="Address Line 2" />}
        </form.AppField>
        <form.AppField
          name="address.city"

        >
          {(field) => <field.TextField label="City" />}
        </form.AppField>
        <form.AppField
          name="address.state"

        >{(field) => <field.TextField label="State" />}</form.AppField>
        <form.AppField
          name="address.zip"

        >{(field) => <field.TextField label="ZIP Code" />}</form.AppField>
      </div>
    )
  },
})