import { combineReducers } from "redux";
import { commentReducer } from "./commentReducer";
import { modalReducer } from "./modalReducer";
import { postsReducer } from "./postsReducer";
import { searchReducer } from "./searchReducer";

export const rootReducer = combineReducers({
    posts: postsReducer,
    modal: modalReducer,
    comments: commentReducer,
    searchStr: searchReducer
});