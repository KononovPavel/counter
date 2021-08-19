import React, {useEffect, useState} from 'react';
import './App.css';
import {SettingsBlock} from "./components/SettingsBlock";
import {WorkBoard} from "./components/WorkBoard";

function App() {

    const [count, setCount] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [disableInc, setDisableInc] = useState<boolean>(true);
    const [disableReset, setDisableReset] = useState<boolean>(true)
    const [disableSet, setDisableSet] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false);
    const [red, setRed] = useState<boolean>(false)

    //
    // useEffect(() => {
    //     getValuesFromLocalStorage()
    // }, [])
    //
    //
    // useEffect(() => {
    //     setToLocalStorage()
    // }, [count, startValue, maxValue])
    //
    //
    // const setToLocalStorage = () => {
    //     let counter = {
    //         count,
    //         startValue,
    //         maxValue
    //     }
    //     localStorage.setItem('counter', JSON.stringify(counter));
    // }
    //
    // const getValuesFromLocalStorage = () => {
    //     let counterValuesAsSting = localStorage.getItem('counter');
    //     if(counterValuesAsSting) {
    //         let counterValue  = JSON.parse(counterValuesAsSting)
    //         setCount(counterValue.count)
    //         setStartValue(counterValue.startValue)
    //         setMaxValue(counterValue.maxValue)
    //         setDisableSet(false)
    //     }
    // }


    const incButtonClick = () => {
        setCount(count + 1);
        setDisableSet(true)
        setRed(false);
        if (count === maxValue - 1) {
            setDisableInc(true)
            setRed(true)
        }
    }

    const resetCount = () => {
        setCount(startValue);
        setDisableInc(false);
        setRed(false)
    }

    const changeStartValue = (newStartValue: number) => {
        setStartValue(newStartValue);
        if (newStartValue < 0) {
            setDisableInc(true);
            setDisableSet(true);
            setDisableReset(true);
            setError(true);
        } else if (newStartValue >= maxValue) {
            setDisableSet(true);
            setDisableInc(true);
            setDisableReset(true);
            setError(true);
        } else {
            setDisableSet(false);
            setError(false)
        }
    }

    const changeMaxValue = (newMaxValue: number) => {
        setMaxValue(newMaxValue)
        if (newMaxValue < 0 || newMaxValue <= startValue ) {
            setDisableSet(true);
            setDisableInc(true);
            setDisableReset(true);
            setError(true)
        } else {
            setDisableSet(false);
            setError(false)
        }
    }

    const setValues = () => {
        setCount(startValue);
        setDisableInc(false);
        setDisableReset(false);
        setDisableSet(true);
        setRed(false);
        // table = count
    }


    return (
        <div className="App">

            <SettingsBlock
                error={error}
                startValue={startValue}
                maxValue={maxValue}
                newStartValue={changeStartValue}
                newMaxValue={changeMaxValue}
                setValues={setValues}
                disableSet={disableSet}
            />
            <WorkBoard
                red={red}
                increment={incButtonClick}
                reset={resetCount}
                disableInc={disableInc}
                disableReset={disableReset}
                count={count}
                startValue={startValue}
                maxValue={maxValue}
            />
        </div>
    );
}

export default App;
