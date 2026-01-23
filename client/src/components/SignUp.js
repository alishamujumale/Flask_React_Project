import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'; 

const SignUp = () => {
  const {register,watch,handleSubmit: hookFormSubmit,reset,formState:{errors}} = useForm();

  const watchUsername = watch("username");

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
    console.log("Watched username:", watchUsername);
    // Add API call here
    reset();
  });

  return <div className="container">
    <div className="form">
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" 
            placeholder="Your Username"
            {...register("username",{required:true,maxLength:25})}
            />
          </Form.Group>
          <br></br>
          {errors.username && <span style={{color:'red'}}>Username is required and max length is 25</span>}
          
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
            placeholder="Your Email"
            {...register("email",{required:true,maxLength:80})}/>
            <br></br>
          {errors.email && <span style={{color:'red'}}>Email is required and max length is 80</span>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            {...register("password",{required:true,minLength:8})}/>
            <br></br>
          {errors.password && <span style={{color:'red'}}>Password is required and min length is 8</span>}
          <br></br>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Your Password"
            {...register("confirmPassword",{required:true,minLength:8})}
            />
            <br></br>
          {errors.confirmPassword && <span style={{color:'red'}}>Confirm Password is required and min length is 8</span>}
          <br></br>
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
