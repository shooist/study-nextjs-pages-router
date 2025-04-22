/**
 * 参考:
 * https://github.com/TanStack/form/discussions/1350
 * withFormの再利用
 * https://github.com/TanStack/form/discussions/1382
 * AppFieldExtendedReactFormApiの型定義
 */

import {
  createFormHook,
  createFormHookContexts,
  FieldComponent,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import { ComponentType, PropsWithChildren } from "react";
// import * as v from "valibot";

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

type FormData = {
  firstName: string;
  lastName: string;
};

// const formSchema = v.object({
//   firstName: v.string(),
//   lastName: v.string(),
// });

const fieldComponents = {
  TextField,
};

const formComponents = {
  AwesomeFormWrapper,
};

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
    AppForm: ComponentType<PropsWithChildren>;
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
  typeof fieldComponents,
  // {
  //   readonly TextField: ({ label }: { label: string }) => JSX.Element;
  // },
  typeof formComponents
  // {
  //   readonly AwesomeFormWrapper: ({
  //     title,
  //     children,
  //   }: React.PropsWithChildren<{
  //     title: string;
  //   }>) => JSX.Element;
  // }
>;

// export type AdvancedFiltersFormType = AppFieldExtendedReactFormApi<
//   FormData,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   typeof formSchema,
//   undefined,
//   typeof fieldComponents,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // Record<any, any>
//   typeof fieldComponents
// >;

function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <label>
      <div>{label}</div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}

function AwesomeFormWrapper({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  const form = useFormContext();
  const handleClick = () => {
    console.log('form values : ', form.state.values);
  };

  return (
    <div>
      <p>{title}</p>
      {children}
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => <button disabled={isSubmitting} onClick={handleClick}>submit</button>}
      </form.Subscribe>
    </div>
  );
}

const { useAppForm } = createFormHook({
  fieldComponents,
  fieldContext,
  formContext,
  formComponents,
});

const App250417 = () => {
  const form = useAppForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
    },
  });
  // const form2 = useAppForm({
  //   defaultValues: {
  //     anotherField: "field2",
  //   },
  // });

  return (
    <>
      <form.AppForm>
        <form.AwesomeFormWrapper title="Form 1">
          <form.AppField name="firstName">
            {(f) => <f.TextField label="First Name" />}
          </form.AppField>
          <form.AppField name="lastName">
            {(f) => <f.TextField label="Last Name" />}
          </form.AppField>
        </form.AwesomeFormWrapper>
      </form.AppForm>
      <ChildForm1 form={form} />

      {/* <form2.AppForm>
        <form2.AwesomeFormWrapper title="Form 2">
          <form2.AppField name="anotherField">
            {(f) => <f.TextField label="Another Field" />}
          </form2.AppField>
        </form2.AwesomeFormWrapper>
      </form2.AppForm> */}
    </>
  );
};

const ChildForm1 = ({ form }: { form: AppFormType<FormData> }) => {
  return (
    <form.AppForm>
      <form.AwesomeFormWrapper title="Form 1">
        <form.AppField name='firstName'>
          {(f) => <f.TextField label="First Name" />}
        </form.AppField>
        <form.AppField name="lastName">
          {(f) => <f.TextField label="Last Name" />}
        </form.AppField>
      </form.AwesomeFormWrapper>
    </form.AppForm>
  );
};
export default App250417;
