import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginUser = () => {
    console.log({ username, password });
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  return <div className="container">
    <div className="form">
        <h1>Login Page</h1>
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
            name="password"/>
          </Form.Group>
          
          <br></br>
          <Button as="sub" variant="primary" type="submit">Login</Button>
        </form>
        <Form.Group>
          <small>Do not have an account? <Link to='/signup'>Create one </Link></small>
        </Form.Group>
    </div>
    </div>

};

export default Login;
