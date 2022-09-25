import React, {useReducer} from "react"
import PricesContext from "./PricesContext"
import PricesReducer from "./PricesReducer"
const PricesState = (props) => {


    const initialState = {
        prices: [],
        dates: [],
        //bovineSelected: null
        bovineSelected: 'TERNEROS',
        loading: false
    }

    
    const [state, dispatch] = useReducer(PricesReducer, initialState)

    const convertToNumbers = (arPrices) => {
        let pricesInNumber = arPrices.map(price=>{
            //console.log(parseFloat((price.replace('.', '')).replace(',','.')));
            return parseFloat((price.replace('.','')).replace(',','.'))})
        return pricesInNumber;
    }

    const getPrices = async (bovine) => {
        //console.log("bovine: ",bovine)
        const data = await fetch('http://localhost:5000/prices/'+bovine).then(x=>x.json()).catch(error=>console.log("error: ",error));
        //console.log("data: ",data);
        let pricesConvertes=await convertToNumbers(data.arrPreciosSubastas);
        dispatch({type:'GET_DATA', payload: {types: data.types,pricesConvertes,dates:data.arrDates}});
    }

    const setBovine = (bovine) => {
        dispatch({type:'SET_BOVINE', payload: {bovine}});
    }

    return(
        <PricesContext.Provider value={{
            prices: state.prices,
            dates: state.dates,
            bovine: state.bovineSelected,
            types: state.types,
            loading: state.loading,
            getPrices,
            setBovine
        }}> 
            {props.children}
        </PricesContext.Provider>
    )
}

export default PricesState
