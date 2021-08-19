import {Dispatch} from "redux"
import {AppStateType} from "../state";


const CHANGE_MAX_VALUE = 'CHANGE_MAX_VALUE'
const CHANGE_START_VALUE = 'CHANGE_START_VALUE'
const INCREMENT = 'INCREMENT'
const RESET = 'RESET'
const SET = 'SET'

let initialState: initStateType = {
    maxValue: 1,
    startValue: 0,
    currentValue: 0,
    red: false,
    error: false,
    incDisable: true,
    resetDisable: true,
    setDisable: false,
    isFetching: true
}

export type initStateType = {
    maxValue: number,
    startValue: number,
    currentValue: number,
    setDisable: boolean,
    incDisable: boolean,
    resetDisable: boolean,
    red: boolean,
    error: boolean
    isFetching: boolean
}
type changeMaxValueActionType = {
    type: typeof CHANGE_MAX_VALUE,
    newMaxValue: number
}
type changeStartValueActionType = {
    type: typeof CHANGE_START_VALUE,
    newStartValue: number
}
type incValueType = {
    type: typeof INCREMENT,
}
type resetValueType = {
    type: typeof RESET,
}
type setAllValue = {
    type: typeof SET
}
type setValue = {
    type: 'SET_VALUE',
    max: number,
    min: number
}
type isFetchingType = {
    type: 'IS_FETCHING',
    is: boolean
}


type actionType =
    changeMaxValueActionType
    | incValueType
    | resetValueType
    | changeStartValueActionType
    | setAllValue
    | setValue
    | isFetchingType


export const counterReducer = (state: initStateType = initialState, action: actionType): initStateType => {
    switch (action.type) {

        case INCREMENT: {
            let copyState = {...state}
            copyState.red = false;
            copyState.currentValue = copyState.currentValue + 1;
            copyState.setDisable = true;
            if (copyState.currentValue === copyState.maxValue) {
                copyState.incDisable = true;
                copyState.red = true;
                copyState.resetDisable = false
            }
            return copyState
        }
        case RESET: {
            return {...state, red: false, currentValue: state.startValue, incDisable: false, resetDisable: true}
        }
        case CHANGE_START_VALUE: {
            let copyState = {...state}
            copyState.incDisable = true;
            copyState.resetDisable = true;
            copyState.startValue = action.newStartValue;
            if (action.newStartValue < 0) {
                copyState.error = true;
                copyState.setDisable = true
            } else if (action.newStartValue >= copyState.maxValue) {
                copyState.error = true;
                copyState.setDisable = true
            } else {
                copyState.error = false;
                copyState.setDisable = false
            }
            return copyState
        }
        case CHANGE_MAX_VALUE: {
            let copyState = {...state}
            copyState.maxValue = action.newMaxValue;
            copyState.incDisable = true;
            copyState.resetDisable = true;
            if (action.newMaxValue < 0 || action.newMaxValue <= copyState.startValue) {
                copyState.error = true;
                copyState.setDisable = true
            } else {
                copyState.error = false;
                copyState.setDisable = false
            }
            return copyState
        }
        case SET: {
            return {
                ...state,
                red: false,
                currentValue: state.startValue,
                incDisable: false,
                setDisable: true,
                resetDisable: true
            }
        }
        case "SET_VALUE": {
            return {...state, startValue: action.min, currentValue: action.min, maxValue: action.max}
        }
        case "IS_FETCHING": {
            return {...state, isFetching: action.is}
        }
        default: {
            return state
        }
    }
}

export const incrementAC = (): incValueType => ({type: INCREMENT})
export const resetAC = (): resetValueType => ({type: RESET})
export const changeStartValueAC = (newValue: number): changeStartValueActionType => ({
    type: CHANGE_START_VALUE,
    newStartValue: newValue
})
export const changeMaxValueAC = (newValue: number): changeMaxValueActionType => ({
    type: CHANGE_MAX_VALUE,
    newMaxValue: newValue
})
export const setValueAC = (): setAllValue => ({type: SET})
export const setValueAC2 = (min: number, max: number): setValue => ({type: "SET_VALUE", min, max})
export const isFetchingAC = (value: boolean): isFetchingType => ({type: "IS_FETCHING", is: value})

export const incValueTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(incrementAC())
}
export const setValueTC2 = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    let max = localStorage.getItem('max')
    let min = localStorage.getItem('min')
    let maxValue = 0;
    let startValue = 0;
    if (max) {
        maxValue = JSON.parse(max)
    }
    if (min) {
        startValue = JSON.parse(min)
    }
    dispatch(setValueAC2(startValue, maxValue))
}

export const setValueTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    localStorage.setItem('max', JSON.stringify(getState().counter.maxValue))
    localStorage.setItem('min', JSON.stringify(getState().counter.startValue))
    dispatch(setValueAC())
}
