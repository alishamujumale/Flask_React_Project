import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { register, watch, handleSubmit: hookFormSubmit, reset, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const watchPassword = watch("password");

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
    setSignupError("");
    
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      };
      
      fetch('/auth/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.message.includes("successfully")) {
            setServerResponse(data.message);
            setShow(true);
            reset();
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setSignupError(data.message);
          }
        })
        .catch(error => {
          console.log(error);
          setSignupError("Signup failed. Please try again.");
        });
    }
    else {
      setSignupError("Passwords do not match!");
    }
  });

  return <div className="container">
    <div className="form">
      <h1>Sign Up Page</h1>
      {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <p>{serverResponse}</p>
        </Alert>
      )}
      {signupError && <p style={{ color: 'red' }}><small>{signupError}</small></p>}
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text"
            placeholder="Your Username"
            {...register("username", { required: "Username is required", maxLength: { value: 25, message: "Username cannot exceed 25 characters" } })}
          />
        </Form.Group>
        {errors.username && <p style={{ color: 'red' }}><small>{errors.username.message}</small></p>}

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required", maxLength: { value: 80, message: "Email cannot exceed 80 characters" } })} />
          {errors.email && <p style={{ color: 'red' }}><small>{errors.email.message}</small></p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            placeholder="Your Password"
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
          {errors.password && <p style={{ color: 'red' }}><small>{errors.password.message}</small></p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            placeholder="Confirm Your Password"
            {...register("confirmPassword", { required: "Confirm Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }, validate: (value) => value === watchPassword || "Passwords do not match" })}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}><small>{errors.confirmPassword.message}</small></p>}
        </Form.Group>

        <br></br>
        <Button variant="primary" type="submit">Sign Up</Button>
      </form>
      <Form.Group>
        <small>Already have an account? <Link to='/login'>Login </Link></small>
      </Form.Group>
    </div>
  </div>
};

export default SignUp;
