import {useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const Sidebar = ({ direction, ...args }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <div className="sidebar">
            Seleccione el tipo de vacuno a consultar:
            <div className="d-flex p-1">
                <Dropdown isOpen={dropdownOpen} onChange={()=>alert("cmabio")} toggle={toggle} direction={direction}>
                    <DropdownToggle caret>Seleccione</DropdownToggle>
                    <DropdownMenu {...args}>
                    {/*<DropdownItem header>Seleccione</DropdownItem>
                     <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider /> */}
                    <DropdownItem>Terneros</DropdownItem>
                    {/* <DropdownItem>Terneras</DropdownItem>
                    <DropdownItem>Vacas</DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>);
}

export default Sidebar