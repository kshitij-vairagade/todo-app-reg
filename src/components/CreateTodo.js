import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import firebase from "../firebase";
import "./Form.css";

const CreateTodo = (props) => {
  const [formObject, setFormObject] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormObject({ ...formObject, [name]: value });
  };

  //add todo to firebase
  const addTodo = (e) => {
    e.preventDefault();
    e.preventDefault();
    firebase
      .addTodo(formObject)
      .then(() => props.history.replace("/Dashboard"));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-sm-4">
            <br></br>
            <br></br>
            <Card>
              <Card.Header>
                <FcTodoList className="list-icon" />
                To-Do List With User Registration
              </Card.Header>

              <Card.Body>
                <Form onSubmit={addTodo}>
                  <Form.Label>Add Title</Form.Label>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <br></br>

                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows="7"
                      type="text"
                      name="body"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <br></br>

                  <Button className="login add-to-list" type="submit">
                    Add To List
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateTodo);
