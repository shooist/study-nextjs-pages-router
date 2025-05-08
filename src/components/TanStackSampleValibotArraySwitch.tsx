import { ComponentType, useState } from "react";
import type {
  AnyFieldApi,
  DeepKeys,
  FieldComponent,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useAppForm } from "@/libs/tanStackForm/form";

const fieldComponents = {};

const formComponents = {};

type AppFieldExtendedReactFormApi<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData>,
  TOnChange extends undefined | FormValidateOrFn<TFormData>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnBlur extends undefined | FormValidateOrFn<TFormData>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta,
  TFieldComponents extends Record<string, ComponentType<any>>,
  TFormComponents extends Record<string, ComponentType<any>>
> = ReactFormExtendedApi<
  TFormData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnServer,
  TSubmitMeta
> &
  NoInfer<TFormComponents> & {
    AppField: FieldComponent<
      TFormData,
      TOnMount,
      TOnChange,
      TOnChangeAsync,
      TOnBlur,
      TOnBlurAsync,
      TOnSubmit,
      TOnSubmitAsync,
      TOnServer,
      TSubmitMeta,
      NoInfer<TFieldComponents>
    >;
    AppForm: React.ComponentType<React.PropsWithChildren>;
  };

export type AppFormType<TFormData> = AppFieldExtendedReactFormApi<
  TFormData,
  FormValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  unknown,
  // typeof fieldComponents,
  {
    readonly TextField: ({ label }: { label: string }) => JSX.Element;
  },
  typeof formComponents
>;

function FieldInfo({ field, label }: { field: AnyFieldApi; label?: string }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length
        ? field.state.meta.errors.map((error, index) => (
            <div className="text-red-500 font-bold" key={index}>
              {error.message}
            </div>
          ))
        : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

type FormData = {
  firstName: string;
  lastName: string;
  hobbies: string[];
}

export default function TanStackSampleValibotArraySwitch() {
  const form = useAppForm({
    defaultValues: {
      firstName: "hogehoge",
      lastName: "foofoo",
      hobbies: ["name1", "name2", "name3"],
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log("!!onSubmit", { value });
    },
  });

  const [switchFieldName, setSwitchFieldName] = useState<DeepKeys<FormData>>("hobbies[0]");
  console.log("switchFieldName", switchFieldName);
  

  const handleClickIndex0 = () => {
    setSwitchFieldName("hobbies[0]");
  }
  const handleClickIndex1 = () => {
    setSwitchFieldName("hobbies[1]");
  }


  return (
    <div>
      <h1>Array Switch Form Example</h1>
      <div className="flex gap-4">
        <button onClick={handleClickIndex0}>switch index0</button>
        <button onClick={handleClickIndex1}>switch index1</button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field key={switchFieldName} name={switchFieldName}>
            {(field) =>  {
              return (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}}
          </form.Field>
        </div>
        {/* <div className="">
          <form.Field
            name="hobbies"
            mode="array"
          >
            {(arrayField) => (
              <div>
                <h2>Hobbies</h2>
                <div className="">
                  {arrayField.state.value.map((_, i) => (
                    <div key={i}>
                      <h3>Hobby {i + 1}</h3>
                      <form.Field
                        name={`hobbies[${i}]`}
                        validators={{
                          onSubmit: HobbySchema,
                        }}
                      >
                        {(field) => (
                          <>
                            <input
                              id={`hobby-${i}`}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            <FieldInfo field={field} label="hobby" />
                          </>
                        )}
                      </form.Field>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form.Field>
        </div> */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}