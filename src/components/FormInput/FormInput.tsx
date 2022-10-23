import {TextField, TextFieldProps} from "@mui/material";
import {FC} from "react";
import {useFormContext} from "react-hook-form";

type FormInputProps = {
    name: string;
    minLength?: number;
    maxLength?: number;
    max?: number;
    min?: number;
    mt?: number;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({name, max, min, minLength, maxLength, ...otherProps}) => {
    const {
        register,
        formState: {errors},
    } = useFormContext();
    return (
        <TextField
            {...otherProps}
            {...register(name, {
                max: {value: max, message: `Bu alanın maksimum değeri ${max} olabilir.`},
                min: {value: min, message: `Bu alanın minimum değeri ${min} olabilir.`},
                required: otherProps.required ? "Bu alan zorunlu!" : false,
                minLength: minLength
                    ? {value: minLength, message: `Bu alan minimum ${minLength} karakter uzunluğunda olmalıdır!`}
                    : undefined,
                maxLength: maxLength
                    ? {value: maxLength, message: `Bu alan maksimum ${maxLength} karakter uzunluğunda olmalıdır!`}
                    : undefined,
            })}
            variant="outlined"
            sx={{mb: "1.5rem", mt: otherProps.mt}}
            error={!!errors[name]}
            helperText={errors[name] ? (errors[name]?.message as unknown as string) : ""}
        />
    );
};

export default FormInput;
