import {useState, useContext, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup, Input, Spinner } from "reactstrap";
import PricesContext from "../context/prices/PricesContext";
import {Row, Container, Button} from 'reactstrap'
import { Formik } from 'formik';

const Sidebar = ({ direction, ...args }) => {
    const {setParameters, loadOldYears, bovine, getTypes, types, yearSelected, yearOld, prices, getPrices, setLoading, setLoadingTypes, loading, loadingTypes, loadRegisters} = useContext(PricesContext)
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
        const loadDone = await loadOldYears()
        if(loadDone=='200'){
            console.log("carga ya realizada")
            getTypes(2023);
        }
    }
    useEffect(()=>{
        initializer();
    },[])

    useEffect(()=>{
        let years = ["2020","2021","2022"];
        if(yearSelected==2023 || (!(years.includes(yearOld) && years.includes(yearSelected)))){//condición para cargar nuevamente los tipos
            setLoadingTypes()
            getTypes(yearSelected);
        }
    },[yearSelected])
    
    if(loading){
        getPrices(bovine,yearSelected);
    }
    const load = () => {
        //var input = document.querySelector('input[type="file"]')
        var input = document.getElementById("excel")
        var year = document.getElementById('loadPeriod').value;
        loadRegisters(input.files[0], year);
    }

    const changePeriod = period => {
        var periodOld=yearSelected;
        setParameters(bovine,period,periodOld)
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
                        Seleccione tipo de vacuno:
                        </Label>
                        <Input
                        id="selectBovine"
                        name="selectBovine"
                        type="select"
                        value={bovine}
                        onChange={(e)=>setParameters(e.target.value.toUpperCase(),yearSelected, yearOld)}
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
                        Seleccione periodo:
                        </Label>
                        <Input
                        id="period"
                        name="period"
                        type="select"
                        value={yearSelected}
                        //multiple
                        //value={["2020","2021"]}
                        onChange={(e)=>
                            changePeriod(e.target.value)
                        }
                        >
                            <option value="">
                                Seleccione
                            </option>
                            <option value="2023">
                                2023
                            </option>
                            <option value="2022">
                                2022
                            </option>
                            <option value="2021">
                                2021
                            </option>
                            <option value="2020">
                                2020
                            </option>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Button
                        id="btnVisualizar"
                        name="btnVisualizar"
                        disabled={yearSelected=='' || bovine=='' }
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