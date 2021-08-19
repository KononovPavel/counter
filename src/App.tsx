import React, {useEffect} from 'react';
import './App.css'
import Counter from "./Components/Counter/Counter";
import SettingsOfCounter from "./Components/Settings/SettingsOfCounter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/state";
import {isFetchingAC} from "./redux/reducers/counterReducer";

const App = () => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.counter.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch(isFetchingAC(false)), 1000)
    }, [dispatch])
    return (
        <div>
            {isFetching
                ? <div className={'app-wrapper'}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                                                      alt=""/></div>
                : <div className={'app-wrapper'}><Counter/><SettingsOfCounter/></div>
            }
        </div>
    );
};

export default App;
