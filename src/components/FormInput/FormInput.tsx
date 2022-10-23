import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  minLength?: number;
  maxLength?: number;
  mt?: number;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, minLength, maxLength, ...otherProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      {...otherProps}
      {...register(name, {
        required: otherProps.required ? "Bu alan zorunlu!" : false,
        minLength: minLength
          ? { value: minLength, message: `Bu alan minimum ${minLength} karakter uzunluğunda olmalıdır!` }
          : undefined,
        maxLength: maxLength
          ? { value: maxLength, message: `Bu alan maksimum ${maxLength} karakter uzunluğunda olmalıdır!` }
          : undefined,
      })}
      variant="outlined"
      sx={{ mb: "1.5rem", mt: otherProps.mt }}
      error={!!errors[name]}
      helperText={errors[name] ? (errors[name]?.message as unknown as string) : ""}
    />
  );
};

export default FormInput;
