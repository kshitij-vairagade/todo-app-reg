import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import { BsUpload } from "react-icons/bs";
import "./Form.css";

const Avatar = (props) => {
  const [avatar, setAvatar] = useState("");

  const handleInputChange = (e) => {
    const image = e.target.files[0];
    setAvatar(() => image);
  };

  // uploading the image
  const upload = () => {
    firebase.storage
      .ref("images" + firebase.auth.currentUser.uid)
      .put(avatar)
      .then(() => {
        props.history.replace("/Dashboard");
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-sm-4 col-sm-12">
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Card>
              <Card.Header>
                <FcTodoList className="list-icon" />
                To-Do List With User Registration
              </Card.Header>

              <Card.Body>
                <Form>
                  <Form.Group className="file-input-card">
                    <label>
                      <Card className="file">
                        <span>
                          <BsUpload className="upload-icon" />
                          Select Avatar
                        </span>

                        <Form.File
                          id="custom-file"
                          hidden
                          onChange={handleInputChange}
                        />
                      </Card>
                    </label>
                  </Form.Group>
                </Form>
              </Card.Body>

              <Button onClick={upload} className="login upload-btn">
                Upload Avatar
              </Button>
              <br></br>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Avatar);
