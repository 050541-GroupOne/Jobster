import {ChangeEvent} from "react";

export interface FormGroupProps {
    type: string;
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    labelText?: string;
}

export interface FormGroupSelectProps {
    labelText?: string;
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    list: string[];
}
