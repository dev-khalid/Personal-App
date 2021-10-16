import { Container, Row, Button ,Col } from 'react-bootstrap';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState,useEffect } from 'react';
function App() {
  console.log('app is being rendared')
  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo,setIt] = useState([16,10,12]) ; 
  console.log(datesToAddClassTo); 
  const onChange = (nextVal) => { 
    setValue(nextVal);
  };
  const onClickDay = (val, event) => { 
    setIt(prevArr=> [...prevArr,val.getDate()])
    console.log(datesToAddClassTo); 
  }; 

  const tileClassName = ({date,view}) => {  
    if(view==='month') { 
      if(datesToAddClassTo.find(d => date.getDate() === d)) {  
        return 'myClass' 
      }
    } 
  }
  
  return (
    <Container>
      <Button className={'btn btn-info'}> hello world</Button>
      <Row>
        <Col xl={6}>
        <Calender 
          value={value} 
          onChange={onChange} 
          onClickDay={onClickDay}  
          tileClassName={tileClassName}
        />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
