import Navbar from "./components/Navbar";
import './App.scss'
import Sidebar from "./components/Sidebar";
import { Row, Col, Container } from "reactstrap";
import Highchart from "./components/Highchart";
import PricesState from "./context/prices/PricesState";



function App() {
  return (
    <PricesState>
      <Navbar/>
      <Container>
        {/* <Row>
          <Col className="col-12">
            <Navbar/>
          </Col>
        </Row> */}
        <Row>
          <Col className="col-3">
            <Sidebar/>
          </Col>
          <Col className="col-9">
            <Highchart/>
          </Col>
        </Row>
      </Container>
    </PricesState>
  );
}

export default App;
