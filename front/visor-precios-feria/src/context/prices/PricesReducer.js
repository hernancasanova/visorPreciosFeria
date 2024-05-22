import { GET_DATA, SET_DATA, SET_TYPES, SET_PARAMETERS, SET_LOADING, SET_LOADING_TYPES } from "../types";

export default (state, action) => {
    const {payload, type} = action
    //console.log("payload: ",payload)
    switch(type) {
        case SET_DATA:
            return {
                ...state,
                loading: false,
                prices: [...state.prices, payload.pricesConvertes],
                dates: [payload.dates],
                establishments:[...state.establishments, payload.establishment]
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: true
                //yearSelected:payload.year, 
                //bovineSelected: payload.bovine
            }
        
        case SET_LOADING_TYPES: 
            return {
                ...state,
                loadingTypes: true
                //yearSelected:payload.year, 
                //bovineSelected: payload.bovine
            }

        case SET_PARAMETERS: 
            return {
                ...state,
                //loading: true
                yearSelected:payload.yearSelected,
                yearOld:payload.yearOld, 
                bovineSelected: payload.bovine,
                establishment: payload.establishment
            }
        
        case SET_TYPES:
            return {
                ...state,
                loadingTypes: false,
                //loading: true,
                types: payload.types,
                //bovineSelected: payload.bovine
            }
        
        default:
            return state;
    }
}