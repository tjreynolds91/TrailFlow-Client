import React, { useState } from "react";
import APIURL from "../helpers/environment";
import {
  Button,
  Container,
  Label,
  Input,
  Form,
  UncontrolledAlert,
} from "reactstrap";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.submitRegister = this.submitRegister.bind(this);
    this.formValidate = this.formValidate.bind(this);

    this.state = {
      email: "",
      password: "",
      password2: "",
      emailErr: "",
      passwordErr: "",
      responseMessage: "",
    };
  }

  submitRegister(event) {
    event.preventDefault();
    const isValid = this.formValidate();
    console.log(isValid);
    if (isValid) {
      if (this.state.password === this.state.password2) {
        fetch(`${APIURL}/user/register`, {
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
              if (res.status === 409) {
                this.setState({ responseMessage: "Account Already Exists" });
                throw new Error("Account Already Exist");
              } else {
                this.setState({ responseMessage: "Something went wrong" });
                throw new Error("Something went wrong");
              }
            }
          })
          .then((data) => {
            this.props.updateToken(data.token);
            console.log(data.message);
            this.setState({ responseMessage: data.message });
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert("Password must match: Please reenter credentials");
      }
    } else {
      return;
    }
  }

  formValidate(event) {
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    // checks password length and returns error if <5
    if (this.state.password.trim().length < 5) {
      passwordErr.TooShort = "Password must contain 5 or more characters.";
      isValid = false;
    }

    // check email is formatted
    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      emailErr.invalidFormat =
        "Invalid email. Email must be formatted as test@test.com";
      isValid = false;
    }

    this.setState({ passwordErr: passwordErr });
    this.setState({ emailErr: emailErr });
    return isValid;
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.submitRegister} className="form-group input-group">
          <Container className="inputs">
            <Container className="form-group input-group">
              <Label for="email" className="sr-only" />
              <Input
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
              />
              <br />
              {this.state.emailErr ? (
                <UncontrolledAlert color="danger">
                  {Object.keys(this.state.emailErr).map((key) => {
                    return <div>{this.state.emailErr[key]}</div>;
                  })}
                </UncontrolledAlert>
              ) : (
                <></>
              )}
            </Container>

            <Container className="form-group input-group">
              <Label for="password" className="sr-only" />
              <Input
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                className="form-control"
                id="password"
                placeholder="Choose a password"
              />
              {this.state.passwordErr ? (
                <UncontrolledAlert color="danger">
                  {Object.keys(this.state.passwordErr).map((key) => {
                    return <div>{this.state.passwordErr[key]}</div>;
                  })}
                </UncontrolledAlert>
              ) : (
                <></>
              )}
            </Container>

            <Container className="form-group input-group">
              <Label for="password2" className="sr-only" />
              <Input
                onChange={(e) => this.setState({ password2: e.target.value })}
                type="password"
                className="form-control"
                id="password2"
                placeholder="Confirm password"
              />
            </Container>
          </Container>

          <Container className="footerLoginModal text-center">
            <Button
              type="submit"
              onClick={this.submitRegister}
              className="signUpBtn"
            >
              Sign Up
            </Button>
            <p>{this.state.responseMessage}</p>
          </Container>
        </Form>
      </Container>
    );
  }
}

// const Register = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [emailErr, setEmailErr] = useState("");
//   const [passwordErr, setPasswordErr] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   // const [isValid, setIsValid] = useState("");

// const submitRegister = (event) => {
//   event.preventDefault();
//   const isValid = formValidate();
//   console.log(isValid);
//   if (isValid) {
//     if (password === password2) {
//       fetch(`${APIURL}/user/register`, {
//         //!needs to be updated to heroku for "production"
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })
//         .then((res) => {
//           if (res.ok) {
//             return res.json();
//           } else {
//             if (res.status === 409) {
//               setResponseMessage("Account Already Exists");
//               throw new Error("Account Already Exist");
//             } else {
//               setResponseMessage("Something went wrong");
//               throw new Error("Something went wrong");
//             }
//           }
//         })
//         .then((data) => {
//           props.updateToken(data.token);
//           console.log(data.message);
//           setResponseMessage(data.message);
//         })
//         .catch((err) => {
//           alert(err);
//         });
//     } else {
//       alert("Password must match: Please reenter credentials");
//     }
//   } else {
//     return;
//   }
// };

// const formValidate = (event) => {
//   const passwordErr = {};
//   const emailErr = {};
//   let isValid = true;

//   // checks password length and returns error if <5
//   if (password.trim().length < 5) {
//     passwordErr.TooShort = "Password must contain 5 or more characters.";
//     isValid = false;
//   }

//   // check email is formatted
//   if (!email.includes("@") || !email.includes(".")) {
//     emailErr.invalidFormat =
//       "Invalid email. Email must be formatted as test@test.com";
//     isValid = false;
//   }

//   setPasswordErr(passwordErr);
//   setEmailErr(emailErr);
//   return isValid;
// };

//   return (
//     <Container>
//       <Form onSubmit={submitRegister} className="form-group input-group">
//         <Container className="inputs">
//           <Container className="form-group input-group">
//             <Label for="email" className="sr-only" />
//             <Input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Email Address"
//             />
//             <br />
//             {emailErr ? (
//               <UncontrolledAlert color="danger">
//                 {Object.keys(emailErr).map((key) => {
//                   return <div>{emailErr[key]}</div>;
//                 })}
//               </UncontrolledAlert>
//             ) : (
//               <></>
//             )}
//           </Container>

//           <Container className="form-group input-group">
//             <Label for="password" className="sr-only" />
//             <Input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Choose a password"
//             />
//             {passwordErr ? (
//               <UncontrolledAlert color="danger">
//                 {Object.keys(passwordErr).map((key) => {
//                   return <div>{passwordErr[key]}</div>;
//                 })}
//               </UncontrolledAlert>
//             ) : (
//               <></>
//             )}
//           </Container>

//           <Container className="form-group input-group">
//             <Label for="password2" className="sr-only" />
//             <Input
//               onChange={(e) => setPassword2(e.target.value)}
//               type="password"
//               className="form-control"
//               id="password2"
//               placeholder="Confirm password"
//             />
//           </Container>
//         </Container>

//         <Container className="footerLoginModal text-center">
//           <Button type="submit" onClick={submitRegister} className="signUpBtn">
//             Sign Up
//           </Button>
//           <p>{responseMessage}</p>
//         </Container>
//       </Form>
//     </Container>
//   );
// };

// export default Register;
