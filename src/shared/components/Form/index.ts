import { FieldValues } from "react-hook-form"
import { ArrayField, ArrayFieldProps } from "./ArrayField"
import { ErrorMessage, type ErrorMessageProps } from "./ErrorMessage"
import { Form, type FormProps } from "./Form"
import { SubmitButton, type SubmitButtonProps } from "./SubmitButton"
import { Switch, SwitchProps } from "./Switch"
import { TextField, type TextFieldProps } from "./TextField"

type CompoundForm<T extends FieldValues> = React.FC<FormProps<T>> & {
  TextField: React.FC<TextFieldProps<T>>
  ArrayField: React.FC<ArrayFieldProps<T>>
  Switch: React.FC<SwitchProps<T>>
  SubmitButton: React.FC<SubmitButtonProps>
  ErrorMessage: React.FC<ErrorMessageProps>
}

export const getForm = <T extends FieldValues>() => {
  const FormComponent = Form as CompoundForm<T>

  FormComponent.TextField = TextField<T>
  FormComponent.ArrayField = ArrayField<T>
  FormComponent.Switch = Switch<T>
  FormComponent.SubmitButton = SubmitButton
  FormComponent.ErrorMessage = ErrorMessage

  return FormComponent
}
