import { ComponentType, PropsWithChildren, useEffect, useState } from "react";
import { createFormHookContexts, useStore } from "@tanstack/react-form";
import type {
  AnyFieldApi,
  DeepKeys,
  FieldComponent,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import * as v from "valibot";
import { useAppForm } from "@/libs/tanStackForm/form";

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

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

const FirstNameSchema = v.pipe(
  v.string(),
  v.nonEmpty("First name is required"),
  v.minLength(3, "First name must be at least 3 characters")
);

const HobbySchema = v.pipe(
  v.string(),
  v.nonEmpty("Hobby name is required"),
  v.minLength(3, "Hobby name must be at least 3 characters")
);

function FieldInfo({ field, label }: { field: AnyFieldApi; label?: string }) {
  const fieldErrors = field.state.meta.errors;
  console.log("fieldErrors", label, fieldErrors);
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

  const firstError = useArrayFirstError(form, "hobbies");
  console.log("firstError", firstError);

  return (
    <div>
      <h1>Simple Form Example</h1>
      <div className="">firstError : {firstError}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onSubmit: FirstNameSchema,
            }}
          >
            {(field) => (
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
          <form.Field name="lastName">
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
        <div className="">
          <form.Field
            name="hobbies"
            mode="array"
            // validators={{
            //   onSubmit: HobbiesSchema,
            // }}
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
                {/* <FieldInfo field={arrayField} label="hobbies" /> */}
              </div>
            )}
          </form.Field>
        </div>
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

interface FieldMetaType {
  isValidating: boolean;
  isTouched: boolean;
  isBlurred: boolean;
  isDirty: boolean;
  isPristine: boolean;
  errors: ValidationError[];
  errorMap: Record<string, ValidationError[]>;
}

interface ValidationError {
  kind: string;
  type: string;
  input: string;
  expected: string;
  received: string;
  message: string;
  requirement?: number;
}

function useArrayFirstError<
  TFormValues,
  TFieldName extends DeepKeys<TFormValues>
>(form: AppFormType<TFormValues>, arrayFieldName: TFieldName) {
  console.log("useArrayFirstError", arrayFieldName);

  const [firstError, setFirstError] = useState<string | null>(null);

  // useStoreを使用してフォームの状態を監視
  const fieldMeta = useStore(
    form.store,
    (state) => state.fieldMeta as Record<string, FieldMetaType>
  );
  console.log("fieldMeta", fieldMeta);

  useEffect(() => {
    // fieldMetaが変更されたときに実行
    if (fieldMeta) {
      // 配列フィールドの子要素を検索
      const arrayFieldEntries = Object.entries(fieldMeta).filter(
        ([key]) => key.startsWith(`${arrayFieldName}[`) && key.endsWith("]")
      );

      // 各フィールドのエラーを確認
      for (const [key, meta] of arrayFieldEntries) {
        // errorsプロパティが配列で、要素があるか確認
        if (
          meta.errors &&
          Array.isArray(meta.errors) &&
          meta.errors.length > 0
        ) {
          // 最初のエラーオブジェクトからメッセージを取得
          const firstErrorObj = meta.errors[0] as ValidationError;
          if (firstErrorObj && firstErrorObj.message) {
            setFirstError(firstErrorObj.message);
            return; // 最初のエラーが見つかったら終了
          }
        }
      }

      // エラーが見つからなかった場合はnullに設定
      setFirstError(null);
    }
  }, [fieldMeta, arrayFieldName]);

  return firstError;
}
