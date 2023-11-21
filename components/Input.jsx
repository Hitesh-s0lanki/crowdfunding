import clsx from "clsx";

const Input = ({ 
    id,
    type,
    value,
    onChange,
    disabled,
    placeholder
}) => {


    return ( 
        <input 
            id={id}
            name={id}
            type={type}
            autoComplete={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={clsx(`p-4 form-input block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-xl sm:leading-6`,
            disabled && "opacity-50 cursor-default"
            )}
        />
     );
}
 
export default Input;