import {FC} from "react";
import {FormGroupProps} from "../interfaces/props/FormGroup.ts";

const FormGroup: FC<FormGroupProps> = ({
                                           type,
                                           name,
                                           value,
                                           handleChange,
                                           labelText = name
                                       }) => {

    return (
        <div className='form-group'>
            <label htmlFor={name} className='form-label'>
                {labelText}
            </label>

            <input
                type={type}
                value={value}
                name={name}
                id={name}
                onChange={handleChange}
                className='form-input'
            />
        </div>
    );
};

export default FormGroup;
