import {useState, useContext, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup, Input, Spinner } from "reactstrap";
import PricesContext from "../context/prices/PricesContext";
import {Row, Container, Button} from 'reactstrap'
import { Formik } from 'formik';

const Sidebar = ({ direction, ...args }) => {
    const {setParameters, loadOldYears, bovine, getTypes, types, establishment, establishmentPrev,  yearSelected, yearOld, prices, getPrices, setLoading, setLoadingTypes, loading, loadingTypes, loadRegisters} = useContext(PricesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //const [loadingTypes, setLoadingTypes] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    //console.log("types: ",types)
    /*const loadPrices = async (val) => {
        //console.log("cargando los precios de ",val.toUpperCase())
        setBovine(val.toUpperCase());
        //console.log("bovine: ",bovine)
    }*/
    const initializer = async () => {
        const loadDone = await loadOldYears()//carga los csvs
        if(loadDone=='200'){
            console.log("carga ya realizada")
            getTypes(2024,establishment);//cambiar dependiendo del año actual
        }
    }
    useEffect(()=>{
        initializer();
    },[])

    useEffect(()=>{
        let years = ["2020","2021","2022"];
        if(yearSelected==2023 || (!(years.includes(yearOld) && years.includes(yearSelected))) || establishment=="osorno" ){//condición para cargar nuevamente los tipos
            setLoadingTypes()
            getTypes(yearSelected,establishment);
        }
    },[yearSelected,establishment])
    
    if(loading){
        getPrices(bovine,yearSelected,establishment);
    }
    const load = () => {
        //var input = document.querySelector('input[type="file"]')
        var input = document.getElementById("excel")
        var year = document.getElementById('loadPeriod').value;
        loadRegisters(input.files[0], year);
    }

    const changePeriod = period => {
        //var periodOld=yearSelected;
        //console.log("period: ",period)
        setParameters({bovine,yearSelected:period,yearOld:yearSelected, establishment})
        //setParameters(bovine,period,periodOld)
    }

    const changeEstablishment = establishmentSelected => {
        //var periodOld=yearSelected;
        setParameters({bovine,yearSelected,yearOld, establishment:establishmentSelected, establishmentPrev:establishment})
    }
    // console.log("bovine: ",bovine)
    // console.log("yearSelected: ",yearSelected)
    return (
        <div className="sidebar">
            {/* Seleccione el tipo de vacuno a consultar: */}
            {(types.length===0||loadingTypes)?<Spinner style={{margin: "35% 0% 0% 5%"}}/>:<div className="d-flex p-1">
                <Container>
                <Row>
                    <FormGroup>
                        <Label for="selectBovine">
                        Tipo de vacuno:
                        </Label>
                        <Input
                        id="selectBovine"
                        name="selectBovine"
                        type="select"
                        value={bovine}
                        onChange={(e)=>setParameters({bovine:e.target.value.toUpperCase(),yearSelected,yearOld,establishment})}
                        >
                            <option value="">
                                Seleccione
                            </option>
                            {types?types.map(type => {
                                return (
                                <option key={type.key} value={type.key}>
                                    {type.name}
                                </option>
                                );
                            }):<></>}  
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="period">
                        Periodo:
                        </Label>
                        <Input
                        id="period"
                        name="period"
                        type="select"
                        value={yearSelected}
                        //value={["2020","2021"]}
                        onChange={(e)=>
                            changePeriod(e.target.value)
                        }
                        >
                            <option value="">
                                Seleccione
                            </option>
                            <option value="2024">
                                2024
                            </option>
                            <option value="2023" disabled={establishment!="paillaco"}>
                                2023
                            </option>
                            <option value="2022" disabled={establishment!="paillaco"}>
                                2022
                            </option>
                            <option value="2021" disabled={establishment!="paillaco"}>
                                2021
                            </option>
                            <option value="2020" disabled={establishment!="paillaco"}>
                                2020
                            </option>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="establishment">
                        Establecimiento: (próximamente)
                        </Label>
                        <Input
                        id="establishment"
                        name="establishment"
                        type="select"
                        value={establishment}
                        //value={["2020","2021"]}
                        onChange={(e)=>
                            changeEstablishment(e.target.value)
                        }
                        >
                            {/* <option value="">
                                Seleccione
                            </option> */}
                            <option value="paillaco">
                                Paillaco
                            </option>
                            <option value="osorno">
                                Osorno
                            </option>
                            <option disabled value="puertomontt">
                                Puerto montt
                            </option>
                            <option disabled value="puertovaras">
                                Puerto varas
                            </option>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Button
                        id="btnVisualizar"
                        name="btnVisualizar"
                        disabled={yearSelected=='' || bovine=='' || establishment=='' || (establishment!="paillaco" && yearSelected!="2024") }
                        //type="submit"
                        onClick={()=>{setLoading()}}
                        //onChange={(e)=>loadPrices(e.target.value)}
                        >
                            Visualizar datos
                        </Button>
                    </FormGroup>
                </Row>
                <br/><br/><br/>
                </Container>
            </div>}
        </div>);
}

export default Sidebar