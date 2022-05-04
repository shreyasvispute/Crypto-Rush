import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserAuth } from "../../firebase/Auth";

import { Button, Container, Form } from "react-bootstrap";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [errorMessage, SetErrorMessage] = useState("");

  const navigate = useNavigate();

  const { createUserAccount } = UserAuth();
  const { currentUser } = UserAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    SetErrorMessage("");
    e.preventDefault();
    try {
      debugger;
      const result = await createUserAccount(username, email, password);
      navigate("/dashboard");
    } catch (e) {
      SetErrorMessage(e.response.data.error);
      console.log(e.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={({ target }) => setUserName(target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
