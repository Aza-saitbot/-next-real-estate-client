import React from 'react';
import {TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {useStylesInput} from "@/shared/ui/InputStyled/config";
import {TextFieldProps} from "@mui/material/TextField/TextField";

type InputStyledType={
    name:string
    label:string
    options:RegisterOptions
} & TextFieldProps
const InputStyled = ({name,label,options,...props}:InputStyledType) => {
    const { control,formState } = useFormContext();
    const s = useStylesInput()

    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...props}
                        label={label}
                        error={!!formState.errors[name]}
                        helperText={formState.errors[name]?.message}
                    />
                )}
            />
            <ErrorMessage
                name={name}
                errors={formState.errors}
                render={({ message }) => <p className={s.error}>{message}</p>}

            />
        </div>
    );
};

export default InputStyled;