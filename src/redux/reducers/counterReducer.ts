const SET_VALUE = 'SET_VALUE'

let initialState:initStateType = {
    maxValue:5,
    startValue:0,
    red:false,
    currentValue:2,
    incDisable:false,
    resetDisable:false,
    setDisable:true
}

 export type initStateType={
    maxValue:number,
    startValue:number,
    currentValue:number,
    setDisable:boolean,
    incDisable:boolean,
    resetDisable:boolean,
    red:boolean
}
type setValueActionType = {
    type :typeof SET_VALUE,
    max:number,
    min:number
}
type actionType = setValueActionType


export const counterReducer = (state:initStateType=initialState, action:actionType):initStateType=>{
    switch (action.type) {
        case SET_VALUE:{
            return {...state, setDisable:true, maxValue:action.max, startValue:action.min}
        }
        default:{
            return  state
        }
    }
}
export const setValueAC = (max:number, min:number)=>({type:SET_VALUE, max, min})
