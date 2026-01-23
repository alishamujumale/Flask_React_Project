import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password, confirmPassword });
    // Add API call here
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return <div className="container">
    <div className="form">
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" 
            placeholder="Your Username"
            value={username}
            onChange={handleChange}
            name="username"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleChange} 
            name="email"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
            name="password"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"/>
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">Sign Up</Button>
        </form>
    </div>
    </div>
};

export default SignUp;
