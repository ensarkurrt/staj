import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  minLength?: number;
  maxLength?: number;
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
          : null,
        maxLength: maxLength
          ? { value: maxLength, message: `Bu alan maksimum ${maxLength} karakter uzunluğunda olmalıdır!` }
          : null,
      })}
      variant="outlined"
      sx={{ mb: "1.5rem" }}
      error={!!errors[name]}
      helperText={errors[name] ? (errors[name]?.message as unknown as string) : ""}
    />
  );
};

export default FormInput;
