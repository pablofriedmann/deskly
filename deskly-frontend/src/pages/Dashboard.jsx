import React from 'react';
import { Container } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container className="my-5 text-center">
      <h2>Welcome to your Dashboard!</h2>
      <p>This is your personal dashboard. You can manage your project, clients, and stuff here.</p>
    </Container>
  );
}

export default Dashboard;