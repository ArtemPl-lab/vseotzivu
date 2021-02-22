import { COMMENT_REPLY, DELETE_COMMENT_REPLY } from "./types";

const initialState = {
    commentReply: false
};

export const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case COMMENT_REPLY:
            return { ...state, commentReply: action.payload }
        case DELETE_COMMENT_REPLY:
            return { ...state, commentReply: false }
        default:
            return state;
    }
}