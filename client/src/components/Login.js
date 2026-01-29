import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { login } from '../auth';
import {useHistory} from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit, watch,reset,formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  console.log(watch("username"));
  console.log(watch("password"));

  const loginUser = (data) => {
    console.log(data);
    reset();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.username, password: data.password })
    };

    fetch('/auth/login', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        if (data.access_token) {
          login(data.access_token);
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
        setLoginError('Invalid username or password');
      });
  };

  const onSubmit = (data) => {
    loginUser(data);
  };
  return <div className="container">
    <div className="form">
        <h1>Login Page</h1>
        {loginError && <p style={{color: 'red'}}><small>{loginError}</small></p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" 
            placeholder="Your Username"
            {...register("username", { required: "Username is required", maxLength: { value: 25, message: "Username cannot exceed 25 characters" } })}
            />
          </Form.Group>
          {errors.username && <p style={{color: 'red'}}><small>{errors.username.message}</small></p>}
          <br></br>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
            />
          </Form.Group>
          {errors.password && <p style={{color: 'red'}}><small>{errors.password.message}</small></p>}
          <br></br>
          <Button variant="primary" type="submit">Login</Button>
        </form>
        <Form.Group>
          <small>Do not have an account? <Link to='/signup'>Create one </Link></small>
        </Form.Group>
    </div>
    </div>

};

export default Login;
