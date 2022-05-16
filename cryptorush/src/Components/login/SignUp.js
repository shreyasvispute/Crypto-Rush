import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserAuth } from "../../firebase/Auth";

import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";
import Blockchain from "../../img/blockchain.png";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [firebaseError, setFirebaseError] = useState(false);
  const [firebaseErrorMessage, setfirebaseErrorMessage] = useState("");

  const navigate = useNavigate();

  const { createUserAccount } = UserAuth();
  const { currentUser } = UserAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  let emailField = "";
  let passwordField = "";
  let usernameField = "";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        const result = await createUserAccount(
          usernameField.value,
          emailField.value,
          passwordField.value
        );
        navigate("/dashboard");
        emailField.value = "";
        passwordField.value = "";
        usernameField.value = "";
      }
    } catch (e) {
      debugger;
      setFirebaseError(true);
      setfirebaseErrorMessage(e.response.data.error);
      console.log(firebaseErrorMessage);
    }
  };

  const findFormErrors = () => {
    const { emailField, passwordField, usernameField } = form;
    const newErrors = {};

    if (!usernameField) newErrors.usernameField = "username cannot be blank!";

    if (usernameField.trim().length === 0)
      newErrors.usernameField = "username cannot be blank spaces";

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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="usernameField">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={(node) => {
                  usernameField = node;
                }}
                autoComplete="displayName"
                type="text"
                placeholder="Enter you name"
                onChange={({ target }) =>
                  setField("usernameField", target.value)
                }
                isInvalid={!!errors.usernameField}
              />
              <Form.Control.Feedback type="invalid">
                {errors.usernameField}
              </Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="password">
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
              <Col className="signup">
                <Button
                  variant="light"
                  className="btn btn-outline-primary signupBtn"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
