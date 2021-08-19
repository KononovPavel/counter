import React, {ChangeEvent, useState} from 'react';
import './Settings.css'
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/state";
import {initStateType, setValueAC} from "../../redux/reducers/counterReducer";

const SettingsOfCounter = () => {

    const state = useSelector<AppStateType,initStateType>(state => state.counter)
    const dispatch = useDispatch();
    let[max, setMax] = useState<number>(state.maxValue)
    let[min, setMin] = useState<number>(state.startValue)

    const changeHandlerMax = (e:ChangeEvent<HTMLInputElement>)=>{
        setMax(+e.currentTarget.value)
    }
    const changeHandlerMin = (e:ChangeEvent<HTMLInputElement>)=>{
        setMin(+e.currentTarget.value)
    }
    const onClickHandler = ()=>{
        dispatch(setValueAC(max, min))
    }

    return (
        <div className={'settings'}>
            <div className={'settingView'}>
                <div className={'set'}>
                    <span className={'span'}>max</span>
                    <input
                        type="number"
                        onChange={changeHandlerMax}
                        value={max}
                    />
                </div>
                <div className={'set'}>
                    <span className={'span'}>min</span>
                    <input
                        type="number"
                        onChange={changeHandlerMin}
                        value={min}
                    />
                </div>
            </div>
            <div className={'settingsButtons'}>
                <Button nameButton={'set'} callBack={()=>onClickHandler()}/>
            </div>
        </div>
    );
};

export default SettingsOfCounter;
