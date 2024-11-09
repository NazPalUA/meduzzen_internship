import { FormControlLabel, Switch as MuiSwitch } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

export type SwitchProps<T extends FieldValues> = {
  name: Path<T>
  label: string
}

export function Switch<T extends FieldValues>({ name, label }: SwitchProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel control={<MuiSwitch {...field} checked={field.value} />} label={label} />
      )}
    />
  )
}
