import React from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Container className="p-4 bg-white rounded shadow-sm" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <Image src="/logo.svg" style={{ width: '120px', marginBottom: '10px' }} />
          <h2 className="form-title">Welcome!</h2>
          <p>
            <small>Don't have an account? </small>
            <Link to="/register" style={{ color: 'var(--primary-color)' }}>
              Sign up
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log('Login data:', values);
            navigate('/dashboard');
          }}
        >
          {({ handleSubmit, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-floating mb-3">
                <Field
                  type="email"
                  name="email"
                  id="formEmail"
                  placeholder="Email address"
                  className={`form-control border-0 border-bottom ${
                    touched.email && errors.email ? 'is-invalid' : ''
                  }`}
                />
                <Form.Label htmlFor="formEmail">Email address</Form.Label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Field
                  type="password"
                  name="password"
                  id="formPassword"
                  placeholder="Password"
                  className={`form-control border-0 border-bottom ${
                    touched.password && errors.password ? 'is-invalid' : ''
                  }`}
                />
                <Form.Label htmlFor="formPassword">Password</Form.Label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  borderColor: 'var(--primary-color)',
                }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default LoginForm;