import Navbar from "./components/Navbar";
import './App.scss'
import Sidebar from "./components/Sidebar";
import { Row, Col, Container } from "reactstrap";
import Highchart from "./components/Highchart";


function App() {
  return (
    <div>
      <Navbar/>
      <Container>
        <Row>
          <Col className="col-3">
            <Sidebar/>
          </Col>
          <Col className="col-9">
            <Highchart/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
