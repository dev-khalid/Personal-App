import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import { getGymData, postGymData } from '../actions/gymActions';
import { useDispatch, useSelector } from 'react-redux';

const GymScreen = () => {
  const [value, onChange] = useState(new Date());
  const [postLoading, setPostLoading] = useState(undefined);
  const dispatch = useDispatch();
  const gymDateDetails = useSelector((state) => state.gymDateDetails);
  const { loading, details, datesOnly, error } = gymDateDetails;

  //selectively style tiles
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && datesOnly) {
      if (datesOnly.find((d) => d === new Date(date).getDate())) {
        return 'bg-primary';
      }
    }
  };

  const onClickDay = (value) => {
    const userId = 1;
    dispatch(postGymData(userId, value));
    setPostLoading(false);
  };

  useEffect(() => {
    if (!datesOnly) dispatch(getGymData(8, 2021));
    if (datesOnly && postLoading === false) {
      dispatch(getGymData(8, 2021));
      setPostLoading(undefined);
    }
  }, [dispatch, datesOnly, postLoading]);

  return (
    <Row>
      <h3 className={'text-center my-3'}>Gym Tracker</h3>
      <Col md={6}>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <Calendar
            className="rounded p-3"
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
            onClickDay={onClickDay}
          />
        )}
      </Col>
    </Row>
  );
};

export default GymScreen;
