import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import { getGymData } from '../actions/gymActions';
import { useDispatch, useSelector } from 'react-redux';

const GymScreen = () => {
  const [value, onChange] = useState(new Date());

  const dispatch = useDispatch();
  const gymDateDetails = useSelector((state) => state.gymDateDetails);
  const { loading, details, error } = gymDateDetails;
  useEffect(() => {
    dispatch(getGymData(8, 2021));
  }, [dispatch]);
  return (
    <Row>
      <h3 className={'text-center my-3'}>Gym Tracker</h3>
      <Col md={6}>
        {
          loading && <h1>Loading </h1>
        }
        <Calendar className="rounded p-3" onChange={onChange} value={value} />
      </Col>
    </Row>
  );
};

export default GymScreen;
