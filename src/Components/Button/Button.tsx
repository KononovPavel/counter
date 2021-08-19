import React from 'react';
import './Button.css'

type ButtonPropsType ={
    nameButton:string,
    callBack: () => void,
    disabled?:boolean | null
}

const Button: React.FC<ButtonPropsType> = (props) => {
    const click = ()=> props.callBack()

    return (
        <div>
            <button className={"btn"} onClick={click} disabled={!!props.disabled}>{props.nameButton}</button>
        </div>
    );
};

export default Button;
