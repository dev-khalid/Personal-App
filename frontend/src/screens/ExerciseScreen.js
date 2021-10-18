import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Calender from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { Doughnut, Pie } from 'react-chartjs-2';

 
const ExerciseScreen = () =>  {
  const [loading, setLoading] = useState(true);//this should be component and app level state . 
  const [value, setValue] = useState(new Date());//this is for react-calender 
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);//app level state . // this should be included in redux store . 
  const [chartData, setChartData] = useState({});//component level state 

  const onChange = (nextVal) => {
    setValue(nextVal);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (datesToAddClassTo.find((d) => date.getDate() === d)) {
        return 'bg-primary';
      }
    }
  };
  const onClickDay = (val, event) => {
    const postGymDate = async () => {
      setLoading(true); 
      const { data } = await axios.post('/api/gymdates', {
        day: val.getDate(),
      });
      console.log(data);
      setDatesToAddClassTo(data); 
      setLoading(false); 
    };
    postGymDate();
    //and also get state
  };


  useEffect(() => {
    const getGymDates = async () => {
      const { data } = await axios.get('/api/gymdates');
      setDatesToAddClassTo(data);
      const done = data.length;
      const missed = new Date().getDate() - done;
      let ChartData = {
        labels: [`Done ${done}`, `Missed ${missed}`],
        datasets: [
          {
            label: 'My First Dataset',
            data: [done, missed], 
            backgroundColor: ['#2196f3', '#DD0004'],
            hoverOffset: 4,
          },
        ],
      };
      setChartData(ChartData);
      setLoading(false);
    };
    getGymDates();
  }, [loading, datesToAddClassTo]);

  return (
    <Container className={'my-4'}>
      <Button className={'btn btn-primary mb-3'}> Gym Tracker </Button>
      <Row>
        <Col md={6}>
          {!loading && <Calender
            value={value}
            onChange={onChange}
            onClickDay={onClickDay}
            tileClassName={tileClassName}
          /> }
        </Col>
        <Col md={3}>
          <h4>Result of {new Date().getDate()} days. </h4>
          <Pie
            data={chartData}
            options={{
              width: '200',
              height: '200',
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseScreen;
