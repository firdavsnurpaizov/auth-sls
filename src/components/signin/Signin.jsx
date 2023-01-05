import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import styles from "./Signin.module.scss";
import * as Yup from "yup";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Add email"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(70fit , "Too Long!")
    .required("Add password"),
});

const Signin = () => {
  const [message, setMessage] = useState();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      fetch(
        "https://168szb6bze.execute-api.us-east-1.amazonaws.com/dev/user/login",
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      )
        .then((response) => response.json())
        .then((data) => setMessage(data));
    } catch (e) {
      console.log({ ERROR: e.message });
    }
  };

  return (
    <div className={styles.signup}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className={styles.form}>
            <h2 className={styles.heading}>Login</h2>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  type="email"
                  name="email"
                  className={styles.formItem}
                  placeholder="Your email"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="email"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your password"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="password"
                />
              </div>
              <div>
                <p style={{ color: "black" }}>{message?.message}</p>
              </div>
              <button className={styles.btn} type="submit">
                <p>Login</p>
              </button>
              <Link className={styles.btn} href="/">
                <p>Home</p>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
