import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserAuth } from "../../firebase/Auth";

import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const { signIn } = UserAuth();
  const { currentUser } = UserAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoComplete="email"
            type="email"
            placeholder="Enter email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoComplete="current-password"
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

export default Login;
