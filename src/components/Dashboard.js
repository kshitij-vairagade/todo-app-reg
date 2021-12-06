import React, { useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TodoModal from './TodoModal';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import { FcTodoList } from 'react-icons/fc';
import { IoIosAddCircle, IoIosLogIn } from 'react-icons/io';
import firebase from '../firebase';
import './Dashboard.css';

const Dashboard = (props) => {
    const[todos, setTodos] = useState([]);
    const[imgUrl, setImgUrl] = useState('');


    const date = new Date();

    useEffect(() => {
        dislayAll();
        getImgUrl();
    }, []);


    const handleShow = (todoToShow) => {
        const newTodos = todos.map(todo => {
            if(todo.id === todoToShow.id) {
                todo.show = !todo.show;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const dislayAll = () => {
        firebase
            .displayAllTodos()
            .then((list) => {
                list.forEach(todo => {
                    todo.show = false;
                });
                setTodos(list);
                console.log(list);
            })
            .catch((err) => console.log(err));
            };


            const deleteFromList = (id) => {
                console.log(id);
                firebase.deleteTodo(id).then(() => {
                    dislayAll();
                });
            }
         
    // dislay image from firebase
    const getImgUrl = () => {
        firebase.storage
            .ref(
                firebase.storage.ref().child("images" + firebase.auth.currentUser.uid)
                .name
            )    
            .getDownloadURL()
            .then((url) => setImgUrl(url));
    };


    return (
        <>
            <Navbar>
                <Navbar.Brand>
                    <FcTodoList className="list-icon"/>
                        ToDo List With User Registration
                    <br></br>
                    <h6>{firebase.getCurrentUsername()}</h6>
                </Navbar.Brand>
                <Image
                    src={imgUrl || "./images/avatar.jpg"}
                    height="80px"
                    width="80px"
                    roundedCircle
                />
                <label>
                    <Link to = "/AddAvatar">
                        <IoIosAddCircle className="addImg"/>
                    </Link>
                </label>

                <Button className="login logout ml-auto" onClick={logout}>
                    <IoIosLogIn className="lock"/>
                        Logout
                </Button>
            </Navbar>

            <br></br>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-sm2 moment">
                        <h5>
                            <Moment format="dddd, MMMM Do YYYY">{date}</Moment>
                        </h5>
                    </div>

                    <div className="col-md-2 col-sm-12">
                        <Link to="/CreateTodo">
                            <Button className="add">
                                +
                            </Button>
                        </Link>
                    </div>

                    <div className="col-md-12">
                        <hr></hr>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>

                    {todos.map((todo) => {
                        return (
                            <div className="col-md-3 col-sm-12" key={todo.id}>
                                <Card className="todo-card">
                                    {todo.title}
                                    <br></br>
                                    <Button
                                        variant = "link"
                                        onClick={() => handleShow(todo)}
                                        className="view"
                                        >
                                            View
                                    </Button>
                                    </Card>

                                    <TodoModal
                                        todo={todo}
                                        handleShow={handleShow}
                                        deleteFromList={deleteFromList}
                                    />

                                    <br></br>
                                </div>
                            );
                        })}
        </div>
    </div>
    </>
    );

    async function logout() {
        await firebase.logout();
        props.history.push('/');
    }
};

export default withRouter(Dashboard);