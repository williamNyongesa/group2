/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const loginContainer = css`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const formGroup = css`
  margin-bottom: 15px;
`;

const loginButton = css`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  YupPassword(yup);

  const errorMessageSchema = yup.object().shape({
    username: yup.string().required('Username required'),
    password: yup.string().password(),
  });

  return (
    <div css={loginContainer}>
      <h1>Login Here</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={errorMessageSchema}
        onSubmit={(values) => {
          fetch('http://127.0.0.1:5555/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then((res) => {
              if (res.status === 201) {
                enqueueSnackbar('Logged in Successfully', { variant: 'success' });
                navigate('/');
              } else if (res.status === 401) {
                enqueueSnackbar('Invalid credentials', { variant: 'error' });
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              enqueueSnackbar('An error occurred. Please try again later.', {
                variant: 'error',
              });
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div css={formGroup}>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                name="username"
                className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
              />
              {errors.username && touched.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div css={formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" css={loginButton}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
    