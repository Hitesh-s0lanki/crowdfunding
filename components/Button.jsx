const Button = ({
    type,
    text
}) => {
    return ( 
        <button className="w-full p-5 bg-green-300 rounded-lg text-xl font-semibold" type={type || "button"}>
            {text}
        </button>
     );
}
 
export default Button;