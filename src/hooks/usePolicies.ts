import { useEffect, useRef, useState } from "react";

export type ValidationResult = {
    description: string;
    isValid: boolean;
}

export type Policy = {
    description: string;
    validator: (value: string) => boolean;
}

const validatePolicies = (value: string, policies: Policy[]): ValidationResult[] => {
    return policies.map((policy) => {
        return {
            description: policy.description,
            isValid: policy.validator(value)
        };
    })
}

const usePolicies = (policies: Policy[]) => {
    const policiesRef = useRef(policies)
    const [validationResults, setvalidationResults] = useState<ValidationResult[]>([]);

    useEffect(() => {
        if (policiesRef.current.length > 0) {
            validate('');
        }
    }, [])

    const validate = (value: string): boolean => {
        if (policiesRef.current.length > 0) {
            const validationResults = validatePolicies(value, policiesRef.current)
            const hasErrors = validationResults.some(x => !x.isValid);
            setvalidationResults([...validationResults]);
            return !hasErrors;
        }

        return true;
    }

    return {
        validate,
        validationResults
    }
}

export default usePolicies;