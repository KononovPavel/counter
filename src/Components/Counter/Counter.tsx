import React from 'react';
import './Counter.css'
import Button from "../Button/Button";

const Counter = () => {
    return (
        <div className={'counter'}>
            <div className={'counterView'}>
                <span className={'count'}>5</span>
            </div>
            <div className={'buttonsBlock'}>
                <Button nameButton={'inc'} callBack={()=>alert('hello')}/>
                <Button nameButton={'reset'} callBack={()=>alert('hello')}/>
            </div>
        </div>
    );
};

export default Counter;
