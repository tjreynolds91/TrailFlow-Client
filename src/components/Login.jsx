import React, { useState } from "react";
import { Button, Container, Label, Input, Form } from "reactstrap";
import APIURL from "../helpers/environment";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    // this.setEmail = this.setEmail.bind(this);
    // this.setLoginMessage = this.setLoginMessage.bind(this);
    // this.setPassword = this.setPassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loginMessage: "",
    };
  }

  submitLogin(event) {
    if (this.state.email && this.state.password) {
      event.preventDefault();
      fetch(`${APIURL}/user/login`, {
        //!needs to be updated to heroku for "production"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            this.setState({ loginMessage: "Login failed" });
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          this.props.updateToken(data.token);
          console.log(data.message);
          this.setState({ loginMessage: data.message });
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Email and Password are required");
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.submitLogin} className="form-group input-group">
          <Container className="inputs">
            <Container className="form-group input-group">
              <Label htmlFor="email" className="sr-only" />
              <Input
                onChange={(e) => this.setState({ email: e.target.value })}
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
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </Container>
          </Container>
          <Container className="footerLoginModal text-center">
            <Button onClick={this.submitLogin} className="signUpBtn">
              Login
            </Button>
            <p>{this.state.loginMessage}</p>
          </Container>
        </Form>
      </Container>
    );
  }
}

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginMessage, setLoginMessage] = useState("");

// const submitLogin = (event) => {
//   if (email && password) {
//     event.preventDefault();
//     fetch(`${APIURL}/user/login`, {
//       //!needs to be updated to heroku for "production"
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           setLoginMessage("Login failed");
//           throw new Error("Login failed");
//         }
//       })
//       .then((data) => {
//         props.updateToken(data.token);
//         console.log(data.message);
//         setLoginMessage(data.message);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else alert("Email and Password are required");
// };

// return (
//   <Container>
//     <Form onSubmit={submitLogin} className="form-group input-group">
//       <Container className="inputs">
//         <Container className="form-group input-group">
//           <Label htmlFor="email" className="sr-only" />
//           <Input
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             className="form-control"
//             id="email"
//             placeholder="Email Address"
//             required
//           />
//         </Container>

//         <Container className="form-group input-group">
//           <Label htmlFor="password" className="sr-only" />
//           <Input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             className="form-control"
//             id="password"
//             placeholder="Password"
//           />
//         </Container>
//       </Container>
//       <Container className="footerLoginModal text-center">
//         <Button onClick={submitLogin} className="signUpBtn">
//           Login
//         </Button>
//         <p>{loginMessage}</p>
//       </Container>
//     </Form>
//   </Container>
// );
// };

// export default Login;
