import { COMMENT_REPLY, DELETE_COMMENT_REPLY, HIDE_NOTIFICATION, LOAD_COMPLAINTS, LOAD_REVIEWS, NOTIFICATION, SEARCH } from "./types";

export function fetchReviews(page){
    return async dispatch => {
        const response = await fetch('/api/posts/get/reviews', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                page: page
            })
        });
        const json = await response.json();
        dispatch({ type: LOAD_REVIEWS, payload: json});
    }
}
export function fetchComplaints(page){
    return async dispatch => {
        const response = await fetch('/api/posts/get/complaints', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                page: page
            })
        });
        const json = await response.json();
        dispatch({ type: LOAD_COMPLAINTS, payload: json});
    }
}
export function notification(content){
    return {
        type: NOTIFICATION,
        payload: content
    }
}

export function hideNotification(){
    return {
        type: HIDE_NOTIFICATION
    }
}
export function commentReply(comment){
    return{
        type: COMMENT_REPLY,
        payload: comment
    }
}
export function deleteCommentReply(){
    return{
        type: DELETE_COMMENT_REPLY
    }
}
export function search(str){
    return async dispatch => {
        const response = await fetch('/api/posts/search',
         'POST',
          JSON.stringify({ search: str }));
        const json = await response.json();
        dispatch( { type: SEARCH, payload: json } );
    }
}