import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { register, watch, handleSubmit: hookFormSubmit, reset, formState: { errors } } = useForm();
  const [show, setShow] = useState(true);
  const [serverResponse,setServerResponse]=useState("");

  const watchUsername = watch("username");

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
    console.log("Watched username:", watchUsername);
    // Add API call here
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
      }
      fetch('/auth/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setServerResponse(data.message);
          console.log(data.message);
        })
        .catch(error=>console.log(error));
        setShow(true);

      reset();
    }
    else {
      alert("Passwords do not match!");
    }

  });

  return <div className="container">
    <div className="form">
      
       {show ?
       <>
       
       <Alert variant="success" onClose={() => setShow(false)} dismissible>
        
        <p>
          {serverResponse}
        </p>
      </Alert>
      <h1>Sign Up Page</h1>
      </>
      :
      <h1>Sign Up Page</h1>
       }
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text"
            placeholder="Your Username"
            {...register("username", { required: true, maxLength: 25 })}
          />
        </Form.Group>

        {errors.username && <p style={{ color: 'red' }}><small>Username is required and max length is 25</small></p>}

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
            placeholder="Your Email"
            {...register("email", { required: true, maxLength: 80 })} />

          {errors.email && <p style={{ color: 'red' }}><small>Email is required and max length is 80</small></p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            placeholder="Your Password"
            {...register("password", { required: true, minLength: 8 })} />

          {errors.password && <p style={{ color: 'red' }}><small>Password is required and min length is 8</small></p>}

        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            placeholder="Your Password"
            {...register("confirmPassword", { required: true, minLength: 8 })}
          />

          {errors.confirmPassword && <p style={{ color: 'red' }}><small>Confirm Password is required and min length is 8</small></p>}

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
