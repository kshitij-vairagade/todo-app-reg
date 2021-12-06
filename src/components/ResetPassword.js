import React,{ useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "../firebase";
import "./Form.css";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"
import { FcTodoList } from "react-icons/fc";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendResetEmail = (event) => {
    event.preventDefault();
    firebase.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setEmailSent(false);
        swal({
          title: "Email sent!",
          text: "Check your email for a link to reset your password.",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {
        alert(
          "Please enter the email address for receiving the link to reset password"
        );
      });
  };

  return (
    <>
      <div className="comtainer">
        <div className="row">
          <div className="col-md-4 offset-md-4 col-sm-12">
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Card className="text-center">
              <Card.Header>
                {" "}
                <FcTodoList className="list-icon" />
                ToDo List With User Registration{" "}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="email">
                      Email address<span>*</span>
                    </Form.Label>

                    <Form.Control
                      type="email"
                      className="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br></br>

                  <Button onClick={sendResetEmail} className="login">
                    Submit Link received on email
                  </Button>
                </Form>
              </Card.Body>

              <Card.Footer>
                <Link to="/">Return to Login</Link>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
