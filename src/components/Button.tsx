import React from 'react'

export interface buttonProps {
    text: string;
    onclick?: () => void;
    aditionalClassNames?: string;
}

const Button: React.FC<buttonProps> = ({ text, onclick, aditionalClassNames: aditionalclass }) => {
    return (
        <button className={`p-2 border-solid border-2 border-indigo-600 rounded-md m-2 max-h-24 text-indigo-600 bg-white ${aditionalclass}`} onClick={onclick}>{text}</button>
    )
}

export default Button