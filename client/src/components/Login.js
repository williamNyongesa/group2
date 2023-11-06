/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const loginContainer = css`
  text-align: center;
  max-width: 400px; 
  margin: 0 auto;
  padding: 20px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const formClass =css`
text-align: center;
max-width: 400px; 
margin: 0 auto;
padding: 20px; 
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
background-color: #f9f9f9;

`

const formGroup = css`
  margin-bottom: 15px;
`;

const loginButton = css`
  background-color: #E9D8A6;
   color: black;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  
`;

const signupLink = css`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
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
          fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then((res) => {
              if (res.status === 201) {
                enqueueSnackbar('Log in Successfully', { variant: 'success' });
                navigate('/');
              } else if (res.status === 401) {
                enqueueSnackbar('Invalid credentials', { variant: 'error' });
              } else if (res.status === 404) {
                enqueueSnackbar('Customer not Registered', { variant: 'error' });
              }
            })
            // .catch((error) => {
            //   console.error('Error:', error);
            //   enqueueSnackbar('An error occurred. Please try again later.', {
            //     variant: 'error',
            //   });
            // });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div css={formClass}>
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
            </div>
          </Form>
        )}
      </Formik>
      <div className="link">
        <div className="login-link">
          <p>Don't have an account?</p>
          <Link to="/signup" css={signupLink}>Sign Up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
