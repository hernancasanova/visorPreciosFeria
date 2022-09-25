import {useState, useContext, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup, Input } from "reactstrap";
import PricesContext from "../context/prices/PricesContext";

const Sidebar = ({ direction, ...args }) => {
    const {setBovine, bovine, getPrices, types} = useContext(PricesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    //console.log("types: ",types)
    const loadPrices = async (val) => {
        //console.log("cargando los precios de ",val.toUpperCase())
        setBovine(val.toUpperCase(),);
        //console.log("bovine: ",bovine)
    }
    // useEffect(()=>{
    //     getPrices(bovine);
    // },[])
    useEffect(() => {
        console.log("por aqui no", bovine)
        getPrices(bovine);
    }, [bovine])
    
    return (
        <div className="sidebar">
            {/* Seleccione el tipo de vacuno a consultar: */}
            <div className="d-flex p-1">
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
                <FormGroup>
                    <Label for="exampleSelect">
                    Seleccione el tipo de vacuno a consultar:
                    </Label>
                    <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(e)=>loadPrices(e.target.value)}
                    >
                        <option val="">
                            Seleccione
                        </option>
                        {types?types.map(type => {
                            return (
                            <option key={type}>
                                {type}
                            </option>
                            );
                        }):<></>}  
                        {/* <option val="">
                            Terneras
                        </option>
                        <option val="">
                            Vacas gordas
                        </option>
                        <option val="">
                            Toros
                        </option>
                        <option val="">
                            Bueyes
                        </option> */}
                    </Input>
                </FormGroup>
            </div>
        </div>);
}

export default Sidebar