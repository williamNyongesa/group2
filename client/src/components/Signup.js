import React, { useState } from "react";
import "./Signup.css"
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const SignupForm = () => {
  const [refreshPage, setRefreshPage] = useState(false);
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()


  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    username: yup.string().required("Must enter a username").max(15),
    password: yup.string().required("Must enter password").min(8).max(12),
    confirmPassword: yup.string().required("Confirm Password").oneOf([yup.ref('password')], "Passwords do not match!")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: formSchema,
    onSubmit: ({confirmPassword, ...values}) => {
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 201) {
            enqueueSnackbar("Account created successfully", {variant: "success"})
            navigate("/login")
          setRefreshPage(!refreshPage);
        }else if (res.status === 422){
            // return res.json()
            enqueueSnackbar("An error occured", {variant: "error"})
        }
      })
    },
  });

  return (
    <div className="signup-form-container">
      <h1>Customer Sign-Up Form</h1>
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control"
          />
          {formik.errors.email && <p className="error-message">{formik.errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            username="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="form-control"
          />
          {formik.errors.name && <p className="error-message">{formik.errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control"
          />
          {formik.errors.password && <p className="error-message">{formik.errors.password}</p>}
        </div>


        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className="form-control"
          />
          {formik.errors.confirmPassword && <p className="error-message">{formik.errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    
    </div>
  );
};

export default SignupForm;
