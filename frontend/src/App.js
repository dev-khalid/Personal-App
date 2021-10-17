import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Calender from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { Doughnut, Pie } from 'react-chartjs-2';

/**
 *
 * @Task_To_Do
 * 1.Redux setup
 * 2.seperate the exercise and calender component
 * 3.Router Setup
 * 4.Structure Frontend OtherWise it's gonna Be so much massy to further work on.
 */
function App() {
  //whenever the page loads it should be getting the current month's data and set it.
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);
  const [chartData, setChartData] = useState({});

  const onChange = (nextVal) => {
    setValue(nextVal);
  };

  const onClickDay = (val, event) => {
    // setDatesToAddClassTo((prevArr) => [...prevArr, val.getDate()]);

    //send data to backend . so that it can add all .
    const postGymDate = async () => {
      const { data } = await axios.post('/api/gymdates', {
        day: val.getDate(),
      });
      console.log(data);
      setDatesToAddClassTo(data);
    };
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
      //ajke koy tarikh and ajker age ar koyta data ache .
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
    //whenever the data has arrived from backend set it in dates to add to class array .
  }, [loading]);

  return (
    <Container className={'my-4'}>
      <Button className={'btn btn-primary mb-3'}> Gym Tracker </Button>
      <Row>
        <Col md={6}>
          <Calender
            value={value}
            onChange={onChange}
            onClickDay={onClickDay}
            tileClassName={tileClassName}
          />
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

export default App;
