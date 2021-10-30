import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import ExerciseScreen from './screens/ExerciseScreen';
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
      <Container>
        <Row>
          <Col className="col-md-3 bg-dark rounded" variant="dark">
            <Header />
          </Col>
          <Col className="col-md-9 "> 
            <Route path='/gym' component={ExerciseScreen} />  
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
