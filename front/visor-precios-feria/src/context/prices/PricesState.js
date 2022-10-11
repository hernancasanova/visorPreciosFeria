import React, {useReducer} from "react"
import PricesContext from "./PricesContext"
import PricesReducer from "./PricesReducer"
const PricesState = (props) => {


    const initialState = {
        prices: [],
        dates: [],
        types:[],
        //bovineSelected: null
        bovineSelected: "",
        yearSelected: "",
        loading: false
    }

    
    const [state, dispatch] = useReducer(PricesReducer, initialState)

    const convertToNumbers = (arPrices) => {
        let pricesInNumber = arPrices.map(price=>{
            //console.log(parseFloat((price.replace('.', '')).replace(',','.')));
            return parseFloat((price.replace('.','')).replace(',','.'))})
        return pricesInNumber;
    }

    const getPrices = async (bovine, year=2022) => {
        //console.log("bovine: ",bovine)
        const data = await fetch('http://localhost:5000/prices/'+bovine+"/"+year).then(x=>x.json()).catch(error=>console.log("error: ",error));

        let pricesConvertes=await convertToNumbers(data.arrPreciosSubastas);
        dispatch({type:'SET_DATA', payload: {pricesConvertes,dates:data.arrDates}});
    }

    const setLoading = () =>{
        dispatch({type:'SET_LOADING', payload: {}});
    }

    const getTypes = async () => {
        const {types} = await fetch('http://localhost:5000/types/').then(x=>x.json()).catch(error=>console.log("error: ",error));
        dispatch({type:'SET_TYPES', payload: {types}});
    }

    const setParameters= (bovine, year) => {//agregar más parametros
        dispatch({type:'SET_PARAMETERS', payload: {bovine,year}});//agregar periodo
    }

    const loadOldYears = async() => {
        const {resp} = await fetch('http://localhost:5000/importdata').then(x=>x.json()).catch(error=>console.log("error: ",error));
        return resp;
    }

    const loadRegisters = async (file, year) => {//en desuso
        console.log("tear: ", year)
        var data = new FormData()
        data.append('excel',file)
        let msj = await fetch('http://localhost:5000/importdata/'+year, {
            method: 'POST',
            body: data
          }).then(x=>x).catch(error=>console.log("error: ",error));
        console.log("msj: ",msj)
    }

    return(
        <PricesContext.Provider value={{
            prices: state.prices,
            dates: state.dates,
            bovine: state.bovineSelected,
            types: state.types,
            loading: state.loading,
            yearSelected: state.yearSelected,
            getPrices,
            setLoading,
            setParameters,
            getTypes,
            loadOldYears,
            loadRegisters
        }}> 
            {props.children}
        </PricesContext.Provider>
    )
}

export default PricesState
