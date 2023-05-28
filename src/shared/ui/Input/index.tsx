import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";


const Input = (props:TextFieldProps) => {
    const {control} = useFormContext()
    return (
        <Controller
            name={props.name ?? ''}
            control={control}
            render={
            ({field}) => (
                <TextField
                    {...props}
                    inputProps={{ min: 0}}
                    variant="outlined"
                    {...field}
                />
            )
        } />
    );
};

export default Input;