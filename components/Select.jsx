const Select = ({
    name,
    onChange,
    value,
    options,
}) => {
    return ( 
        <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((item) => (<option key={item} className="p-3 text-lg" value={item} >{item}</option>))}
        </select>
     );
}
 
export default Select;