import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Calender from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { Pie } from 'react-chartjs-2';
// import {useSelector,useDispatch} from 'react-redux';

const ExerciseScreen = () => {
  const [loading, setLoading] = useState(true); //this should be component and app level state .
  const [value, setValue] = useState(new Date()); //this is for react-calender
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]); //app level state . // this should be included in redux store .
  const [chartData, setChartData] = useState({}); //component level state

  const onChange = (nextVal) => {
    console.log('This is the date & this should be send in backend', nextVal);
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
    console.log('The value : ', val);
    const postGymDate = async () => {
      setLoading(true);
      const { data } = await axios.post('/api/gymdates', {
        day: val.getDate(), //******TASK: db te amra new Date(val).getTime() pathabo / miliseconds ke pathabo
      });
      setDatesToAddClassTo(data); // ******TASK: jei data gula pabo seigulake process kore sekhan theke date gula ber korbo .
      setLoading(false);
    };
    postGymDate();
  };

  useEffect(() => {
    const getGymDates = async () => {
      const { data } = await axios.get('/api/gymdates');
      //******TASK: data will be in miliseconds . we shall process it to dates.
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
          {!loading && (
            <Calender
              value={value}
              onChange={onChange}
              onClickDay={onClickDay}
              tileClassName={tileClassName}
            />
          )}
        </Col>
        <Col md={4}>
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
};

export default ExerciseScreen;
