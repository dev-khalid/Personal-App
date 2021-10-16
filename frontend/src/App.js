import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Calender from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';


function App() {
  //whenever the page loads it should be getting the current month's data and set it.

  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);

  const onChange = (nextVal) => {
    setValue(nextVal);
  };

  const onClickDay = (val, event) => {

    // setDatesToAddClassTo((prevArr) => [...prevArr, val.getDate()]);

    //send data to backend . so that it can add all .
    const postGymDate = async() => { 
      const {data} = await axios.post('/api/gymdates', {day: val.getDate()})
      console.log(data); 
    setDatesToAddClassTo(data)

    }
    postGymDate(); 
    //and also get state 
    

  };

  const tileClassName = ({ date, view }) => {

    if (view === 'month') {
      if (datesToAddClassTo.find((d) => date.getDate() === d)) {
        return 'bg-primary';
      }
    }
  };

  //app level component
  useEffect(() => {
    //action to get data from backend .

    const getGymDates = async () => {
      const { data } = await axios.get('/api/gymdates'); 
      setDatesToAddClassTo(data); 
 
    };
    getGymDates(); 
    //whenever the data has arrived from backend set it in dates to add to class array .
  }, []);

  return (
    <Container className={'my-4'}>
      <Button className={'btn btn-primary mb-3'}> Gym Tracker </Button>
      <Row>
        <Col xl={12}>
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
