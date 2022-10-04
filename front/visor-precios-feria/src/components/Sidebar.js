import {useState, useContext, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup, Input, Spinner } from "reactstrap";
import PricesContext from "../context/prices/PricesContext";
import {Row, Container, Button} from 'reactstrap'
import { Formik } from 'formik';

const Sidebar = ({ direction, ...args }) => {
    const {setParameters, bovine, getTypes, types, yearSelected, prices, getPrices, setLoading, loading} = useContext(PricesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //const [loading, setLoading] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    //console.log("types: ",types)
    /*const loadPrices = async (val) => {
        //console.log("cargando los precios de ",val.toUpperCase())
        setBovine(val.toUpperCase());
        //console.log("bovine: ",bovine)
    }*/
    //const [period,setPeriod] = useState(1992)
    useEffect(()=>{
        getTypes();
    },[])

    //CAMBIAR ESTO
    // useEffect(() => 
    //     console.log("por aqui no", bovine)
    //     getPrices(bovine);
    // }, [bovine])
    if(loading){
        getPrices(bovine,yearSelected);
    }
    console.log("bovine: ",bovine)
    console.log("yearSelected: ",yearSelected)
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
                        <Label for="exampleSelect">
                        Seleccione el tipo de vacuno a consultar:
                        </Label>
                        <Input
                        id="selectBovine"
                        name="select"
                        type="select"
                        onChange={(e)=>setParameters(e.target.value.toUpperCase(),yearSelected)}
                        >
                            <option val="">
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
                        <Label for="exampleSelect">
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
                            <option val="">
                                Seleccione
                            </option>
                            <option val="2050">
                                2022
                            </option>
                            <option val="2021">
                                2021
                            </option>
                            <option val="2020">
                                2020
                            </option>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Button
                        id="excel"
                        name="excel"
                        disabled={!yearSelected  || !bovine}
                        //type="submit"
                        onClick={()=>{setLoading()}}
                        //onChange={(e)=>loadPrices(e.target.value)}
                        >
                            Visualizar datos
                        </Button>
                    </FormGroup>
                </Row>
                {/* <Row>
                    <FormGroup>
                        <Label for="exampleSelect">
                        Seleccione un archivo para cargar registros de años anteriores:
                        </Label>
                        <Input
                        id="excel"
                        name="excel"
                        type="file"
                        onChange={(e)=>alert("Se ha cargado un archivo")}
                        >
                        </Input>
                    </FormGroup>
                </Row> */}
                {/* </form>
       )}
     </Formik> */}
                </Container>
            </div>}
        </div>);
}

export default Sidebar