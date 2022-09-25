import { GET_DATA, SET_BOVINE } from "../types";

export default (state, action) => {
    const {payload, type} = action
    console.log("payload: ",payload)
    switch(type) {
        case GET_DATA:
            return {
                ...state,
                loading: false,
                types: payload.types,
                prices: [payload.pricesConvertes],
                dates: [payload.dates]
            }
        case SET_BOVINE:
            return {
                ...state,
                loading: true,
                bovineSelected: payload.bovine
            }
    }
}