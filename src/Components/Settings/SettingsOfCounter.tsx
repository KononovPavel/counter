import React, {ChangeEvent, useEffect} from 'react';
import './Settings.css'
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/state";
import {
    changeMaxValueAC,
    changeStartValueAC,
    initStateType,
    setValueTC, setValueTC2
} from "../../redux/reducers/counterReducer";

const SettingsOfCounter = () => {

    const state = useSelector<AppStateType,initStateType>(state => state.counter)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setValueTC2())
    }, [dispatch])


    const changeHandlerMax = (e:ChangeEvent<HTMLInputElement>)=>{
       dispatch(changeMaxValueAC(e.currentTarget.valueAsNumber))
    }
    const changeHandlerMin = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(changeStartValueAC(e.currentTarget.valueAsNumber))
    }
    const onClickHandler = ()=>{
        dispatch(setValueTC())
    }

    return (
        <div className={'settings'}>
            <div className={'settingView'}>
                <div className={'set'}>
                    <span className={'span'}>max</span>
                    <input
                        type="number"
                        value={state.maxValue}
                        onChange={changeHandlerMax}
                        className={state.error? 'error':""}
                    />
                </div>
                <div className={'set'}>
                    <span className={'span'}>min</span>
                    <input
                        type="number"
                        value={state.startValue}
                        onChange={changeHandlerMin}
                        className={state.error? 'error':''}
                    />
                </div>
            </div>
            <div className={'settingsButtons'}>
                <Button nameButton={'set'} disabled={state.setDisable} callBack={()=>onClickHandler()}/>
            </div>
        </div>
    );
};

export default SettingsOfCounter;
