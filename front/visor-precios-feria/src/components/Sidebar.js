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
            {types.length===0?<Spinner style={{margin: "100% 0% 0% 40%"}}/>:<div className="d-flex p-1">
                {/* <Dropdown isOpen={dropdownOpen} onChange={()=>{alert("cmabio")}} toggle={toggle} direction={direction}>
                    <DropdownToggle caret>Seleccione</DropdownToggle>
                    <DropdownMenu {...args}>
                    {/*<DropdownItem header>Seleccione</DropdownItem>
                     <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Terneros</DropdownItem>
                    <DropdownItem>Terneras</DropdownItem>
                    <DropdownItem>Vacas</DropdownItem> 
                    </DropdownMenu>
                </Dropdown> */}
                <Container>
                {/* <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         
       }) => (
         <form onSubmit={handleSubmit}> */}
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
                {/*<Row>
                    <FormGroup>
                        <Label for="loadPeriod">
                        Seleccione periodo:
                        </Label>
                        <Input
                        id="loadPeriod"
                        name="loadPeriod"
                        type="select"
                        value={yearSelected}
                        onChange={(e)=>setParameters(bovine,e.target.value)}
                        >
                            <option value="">
                                Seleccione
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
                        <Label >
                        Cargar registros de años anteriores:
                        </Label>
                        <Input
                        id="excel"
                        name="excel"
                        type="file"
                        //onChange={(e)=>alert("Se ha cargado un archivo")}
                        >
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Button
                        id="loadRegisters"
                        name="loadRegisters"
                        //disabled={yearSelected==undefined  || bovine==undefined}
                        //type="submit"
                        onClick={()=>{load()}}
                        //onChange={(e)=>loadPrices(e.target.value)}
                        >
                            Cargar registros
                        </Button>
                    </FormGroup>
                </Row>*/}
                {/* </form>
       )}
     </Formik> */}
                </Container>
            </div>}
        </div>);
}

export default Sidebar