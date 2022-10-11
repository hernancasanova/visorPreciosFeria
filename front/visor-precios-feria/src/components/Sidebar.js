import {useState, useContext, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup, Input, Spinner } from "reactstrap";
import PricesContext from "../context/prices/PricesContext";
import {Row, Container, Button} from 'reactstrap'
import { Formik } from 'formik';

const Sidebar = ({ direction, ...args }) => {
    const {setParameters, loadOldYears, bovine, getTypes, types, yearSelected, prices, getPrices, setLoading, loading, loadRegisters} = useContext(PricesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //const [loading, setLoading] = useState(false);
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
            getTypes();
        }
    }
    useEffect(()=>{
        initializer();
    },[])

    if(loading){
        getPrices(bovine,yearSelected);
    }
    const load = () => {
        //var input = document.querySelector('input[type="file"]')
        var input = document.getElementById("excel")
        var year = document.getElementById('loadPeriod').value;
        loadRegisters(input.files[0], year);
    }
    // console.log("bovine: ",bovine)
    // console.log("yearSelected: ",yearSelected)
    return (
        <div className="sidebar">
            {/* Seleccione el tipo de vacuno a consultar: */}
            {types.length===0?<Spinner style={{margin: "30% 0% 0% 10%"}}/>:<div className="d-flex p-1">
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
                        onChange={(e)=>setParameters(e.target.value.toUpperCase(),yearSelected)}
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
                        onChange={(e)=>setParameters(bovine,e.target.value)}
                        >
                            <option value="">
                                Seleccione
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