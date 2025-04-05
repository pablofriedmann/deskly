import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="text-center my-5">
      <img src="/logo.svg" alt="Deskly Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h1 style={{ color: 'var(--primary-color)' }}>Welcome to Deskly</h1>
      <p style={{ color: 'var(--text-color)', maxWidth: '600px', margin: '0 auto' }}>
      Deskly: A Simple ERP for Freelancers and Small Businesses
      </p>
      <div className="mt-4">
        <Button
          href="/login"
          style={{
            backgroundColor: 'var(--primary-color)',
            borderColor: 'var(--primary-color)',
            marginRight: '10px',
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          href="/register"
          variant="outline-primary"
          style={{
            color: 'var(--primary-color)',
            borderColor: 'var(--primary-color)',
          }}
        >
          Registrarse
        </Button>
      </div>
    </Container>
  );
}

export default Home;