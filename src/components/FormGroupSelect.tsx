import {FormGroupSelectProps} from "../interfaces/props/FormGroup.ts";

const FormGroupSelect = ({ labelText, name, value, handleChange, list }: FormGroupSelectProps) => {
	return (
		<div className='form-row'>
		<label htmlFor={name} className='form-label'>
		{labelText || name}
	</label>
	<select
	name={name}
	value={value}
	id={name}
	onChange={handleChange}
	className='form-select'
		>
		{list.map((itemValue, index) => {
				return (
					<option key={index} value={itemValue}>
					{itemValue}
					</option>
			);
			})}
		</select>
		</div>
);
};

export default FormGroupSelect;
