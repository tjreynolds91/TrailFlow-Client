import React, { useState } from "react";
import { Button, Container, Label, Input, Form } from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const submitLogin = (event) => {
    if (email && password) {
      event.preventDefault();
      fetch("https://tjr-trailflow.herokuapp.com/user/login", {
        //!needs to be updated to heroku for "production"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setLoginMessage("Login failed");
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          props.updateToken(data.token);
          console.log(data.message);
          setLoginMessage(data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Email and Password are required");
  };

  return (
    <Container>
      <Form onSubmit={submitLogin} className="form-group input-group">
        <Container className="inputs">
          <Container className="form-group input-group">
            <Label htmlFor="email" className="sr-only" />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              placeholder="Email Address"
              required
            />
          </Container>

          <Container className="form-group input-group">
            <Label htmlFor="password" className="sr-only" />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </Container>
        </Container>
        <Container className="footerLoginModal text-center">
          <Button onClick={submitLogin} className="signUpBtn">
            Login
          </Button>
          <p>{loginMessage}</p>
        </Container>
      </Form>
    </Container>
  );
};

export default Login;
