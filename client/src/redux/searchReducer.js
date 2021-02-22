import { SEARCH } from "./types";

const initialState = '';

export const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case SEARCH:
            return action.payload;
        default:
            return state;
    }
}