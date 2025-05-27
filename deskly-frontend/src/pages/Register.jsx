import React from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import api from '../api';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <h2 className="form-title">Create an account</h2>
          <p>
            <small>Already registered? </small>
            <Link to="/login" style={{ color: 'var(--primary-color)' }}>
              Sign in
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await api.post('/register', {
                email: values.email,
                password: values.password,
              });

              const response = await api.post('/login', {
                email: values.email,
                password: values.password,
              });
              const { access_token } = response.data;
              dispatch(login({ user: { email: values.email }, token: access_token }));
              navigate('/dashboard');
            } catch (error) {
              console.error('Registration failed:', error);
              alert('Registration failed. Please try again.');
            }
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, touched, errors, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-floating mb-3">
                <Field
                  type="text"
                  name="name"
                  id="formName"
                  placeholder="Name"
                  className={`form-control border-0 border-bottom ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                />
                <Form.Label htmlFor="formName">Name</Form.Label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

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

              <Form.Group className="form-floating mb-3">
                <Field
                  type="password"
                  name="confirmPassword"
                  id="formConfirmPassword"
                  placeholder="Confirm Password"
                  className={`form-control border-0 border-bottom ${
                    touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                  }`}
                />
                <Form.Label htmlFor="formConfirmPassword">Confirm Password</Form.Label>
                <ErrorMessage
                  name="confirmPassword"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Register;