import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import usePolicies, { Policy, ValidationResult } from '../../hooks/usePolicies';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    policies?: Policy[];
    label?: string;
    children?: (validationResult: ValidationResult) => React.ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const { policies, onChange, value, children, ...rest } = props;
    const { validationResults, validate } = usePolicies(policies ?? []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e);
        }

        validate(e.target.value);
    };

    return (
        <React.Fragment>
            <TextField
                {...(rest as TextFieldProps)}
                variant='outlined'
                type='password'
                onChange={handleChange}
                value={value}
            ></TextField>
            {validationResults?.map((validationResult, index) => {
                return <React.Fragment key={index}>{children && children(validationResult)}</React.Fragment>;
            })}
        </React.Fragment>
    );
};

export default PasswordInput;
