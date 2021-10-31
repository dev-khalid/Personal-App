import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import GymScreen from './screens/GymScreen';
import {BrowserRouter as Router,Route} from 'react-router-dom'

/**
 *
 * @Task_To_Do
 * 1.Redux setup
 * 2.seperate the exercise and calender component
 * 3.Router Setup
 * 4.Structure Frontend OtherWise it's gonna Be so much massy to further work on.
 */
function App() {
  return (
    <Router> 
      <Container style={{"marginLeft": "0px"}}>
        <Row>
          <Col md={2} className={'bg-dark py-3'} style={{"height":"100vh"}} variant="dark">
            <Header />
          </Col>
          <Col md={10}> 
            <Route path='/gym' component={GymScreen} />  
          </Col>
        </Row> 
        </Container>
    </Router>
  );
}

export default App;
