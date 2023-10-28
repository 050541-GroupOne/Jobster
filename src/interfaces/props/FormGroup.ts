import {ChangeEvent} from "react";

export interface FormGroupProps {
    type: string;
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    labelText?: string;
}

