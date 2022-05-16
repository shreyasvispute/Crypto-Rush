import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserAuth } from "../../firebase/Auth";

import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";

import Blockchain from "../../img/blockchain.png";

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState(false);
  const [firebaseErrorMessage, setfirebaseErrorMessage] = useState("");

  let emailField = "";
  let passwordField = "";

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const navigate = useNavigate();

  const { signIn, currentUser, GoogleSignIn } = UserAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const SocialSignIn = async () => {
    try {
      await GoogleSignIn();
    } catch (error) {
      setFirebaseError(true);
      setfirebaseErrorMessage(error.message);
      console.log(firebaseErrorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        await signIn(emailField.value, passwordField.value);
        navigate("/dashboard");
        emailField.value = "";
        passwordField.value = "";
      }
    } catch (e) {
      debugger;
      if (e.code && e.code === "auth/wrong-password") {
        setFirebaseError(true);
        setfirebaseErrorMessage("Invalid Username or Password!");
      } else {
        setFirebaseError(true);
        setfirebaseErrorMessage(e.message);
      }
    }
  };

  const findFormErrors = () => {
    const { emailField, passwordField } = form;
    const newErrors = {};

    if (!emailField) newErrors.emailField = "email cannot be blank!";

    if (!isValidEmail(emailField))
      newErrors.emailField = "Please enter a proper email";

    if (passwordField) {
      if (passwordField.trim().length === 0) {
        newErrors.passwordField = "password cannot be blank spaces!";
      } else if (passwordField.length < 6) {
        newErrors.passwordField =
          "password length should be greater than 6 chars";
      }
    } else {
      newErrors.passwordField = "password cannot be blank!";
    }
    return newErrors;
  };

  function isValidEmail(str) {
    if (str !== undefined) {
      var res = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
      return res !== null;
    } else {
      return false;
    }
  }

  return (
    <Container className="loginbox">
      <Row>
        <Col className="loginIcon">
          {" "}
          <div className="d-flex">
            <img src={Blockchain} alt="Crypto-Rush" style={{ height: 80 }} />
            <div className="appname">
              Crypto- <span className="rush-red">Rush</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="emailField">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={(node) => {
                  emailField = node;
                }}
                autoComplete="email"
                type="email"
                placeholder="Enter email"
                onChange={({ target }) => setField("emailField", target.value)}
                isInvalid={!!errors.emailField}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.emailField}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordField">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={(node) => {
                  passwordField = node;
                }}
                autoComplete="current-password"
                type="password"
                placeholder="Password"
                onChange={({ target }) =>
                  setField("passwordField", target.value)
                }
                isInvalid={!!errors.passwordField}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordField}
              </Form.Control.Feedback>
            </Form.Group>

            {firebaseError && (
              <Alert key="error" variant="danger">
                {firebaseErrorMessage}
              </Alert>
            )}
            <Row>
              <Col className="loginButton">
                {" "}
                <Button
                  variant="light"
                  className="btn btn-outline-primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
              {/* <Col className="loginButton">
                {" "}
                <Button
                  variant="light"
                  className="btn btn-outline-danger"
                  onClick={SocialSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  {"  "}Sign In
                </Button>
              </Col> */}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
