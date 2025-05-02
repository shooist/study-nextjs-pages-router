import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'
import * as v from 'valibot'

const FirstNameSchema = v.pipe(
  v.string(),
  v.nonEmpty('First name is required'),
  v.minLength(3, 'First name must be at least 3 characters'),
  )

function FieldInfo({ field }: { field: AnyFieldApi }) {
  // const fieldErrors = field.state.meta.errors
  // console.log('fieldErrors', fieldErrors)
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        field.state.meta.errors.map((error, index) => (
          <div className="text-red-500 font-bold" key={index}>
            {error.message}
          </div>
        ))
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export default function TanStackSampleValibot() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log("onSubmit", {value})
    },
  })

  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onSubmit: FirstNameSchema,
            }}>
            {field => ( // ここで field を引数として受け取る
              <>
                <label htmlFor={field.name}>First Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field
            name="lastName"
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}