import { HIDE_NOTIFICATION, NOTIFICATION } from './types';

const initialState = {
    isShow: false,
    title: '',
    content: ''
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case NOTIFICATION:
            return {
                ...state,
                ...action.payload
            }
        case HIDE_NOTIFICATION:
            return {
                ...state,
                isShow: false,
                title: '',
                content: ''

            }
        default:
            return state
    }
}