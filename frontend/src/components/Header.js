import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Header = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <LinkContainer to="/home">
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/gym">
        <Nav.Link>Gym Tracker</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/study">
        <Nav.Link>Study</Nav.Link> 
      </LinkContainer>
    </Nav>
  );
};

export default Header;
