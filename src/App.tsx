import React, { CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';
import PasswordInput from './components/PasswordInput/PasswordInput';
import { Policy } from './hooks/usePolicies';
import { Check } from '@material-ui/icons';

const passwordPolicies: Policy[] = [
    {
        description: 'At least 8 characters length',
        validator: (value) => value.length >= 8,
    },
    {
        description: 'Contains at least one upper case letter (A-Z)',
        validator: (value) => /[A-Z]/.test(value),
    },
    {
        description: 'Contains at least one lower case letter (a-z)',
        validator: (value) => /[a-z]/.test(value),
    },
    {
        description: 'Contains at least one number (0-9)',
        validator: (value) => /[0-9]/.test(value),
    },
    {
        description: 'Contains at least one symbol (e.g. !, @, #)',
        validator: (value) => /\W/.test(value),
    },
];

const defaultStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const invalidPolicyStyle: CSSProperties = {
    color: 'gray',
    ...defaultStyle,
};

const validPolicyStyle: CSSProperties = {
    color: 'green',
    ...defaultStyle,
};

function App() {
    return (
        <div className='App'>
            <PasswordInput label='Password' placeholder='Password' policies={passwordPolicies}>
                {(validationResult) => {
                    const style = validationResult.isValid ? validPolicyStyle : invalidPolicyStyle;

                    return (
                        <div style={style}>
                            <Check></Check>
                            <span>{validationResult.description}</span>
                        </div>
                    );
                }}
            </PasswordInput>
        </div>
    );
}

export default App;
