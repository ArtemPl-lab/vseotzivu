import { LOAD_COMPLAINTS, LOAD_REVIEWS } from './types';
const initialState = {
    reviews: {
        page: 1,
        data: []
    },
    complaints: {
        page: 1,
        data: []
    }
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_REVIEWS:
            let conc2 = state.reviews.data.concat(action.payload);
            let sconc2 = [...new Set(conc2.map(JSON.stringify))].map(JSON.parse);
            return {
                ...state,
                reviews: {
                    page: state.reviews.page + 1,
                    data: sconc2
                }
            };
        case LOAD_COMPLAINTS:
            let conc = state.complaints.data.concat(action.payload);
            let sconc = [...new Set(conc.map(JSON.stringify))].map(JSON.parse);
            return {
                ...state,
                complaints: {
                    page: state.complaints.page + 1,
                    data: sconc
                }
            };
        default:
            return state;
    }
}