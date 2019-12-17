// import {useReducer} from "react";
interface Istate {
    collapsed: boolean
}
interface Itype {
    type: string
}
export const menuInitState:Istate = { collapsed: false };

export function menuReducer(state:Istate, action:Itype):Istate {
    switch (action.type) {
        case "toggle":
            return { collapsed: !state.collapsed };
        default:
            throw new Error();
    }
}