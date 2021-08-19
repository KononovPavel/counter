import React from 'react';
import './Counter.css'
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/state";
import { incValueTC, initStateType, resetAC} from "../../redux/reducers/counterReducer";

const Counter = () => {

    const state = useSelector<AppStateType, initStateType>(state=>state.counter)
    const dispatch = useDispatch()
    const increment = ()=>{
        dispatch(incValueTC())
    }
    const reset =()=>{
        dispatch(resetAC())
    }
    return (
        <div className={'counter'}>
            <div className={'counterView'}>
                <span className={state.red? 'red':'count'}>{state.maxValue <= state.startValue || (state.maxValue < 0 || state.startValue < 0)
                    ? 'Error'
                    :state.currentValue
                }</span>
            </div>
            <div className={'buttonsBlock'}>
                <Button nameButton={'inc'} disabled={state.incDisable} callBack={()=>increment()}/>
                <Button nameButton={'reset'} disabled={state.resetDisable} callBack={()=>reset()}/>
            </div>
        </div>
    );
};

export default Counter;
