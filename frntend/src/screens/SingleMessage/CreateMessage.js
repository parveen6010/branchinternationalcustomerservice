
import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createMessageAction } from "../../actions/messagesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";

function CreateMessage({ history }) {
  const [customername, setCustomername] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const messageCreate = useSelector((state) => state.messageCreate);
  const { loading, error, message } = messageCreate;


  console.log(message);

  const resetHandler = () => {
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createMessageAction(customername, content, category));
    if (!customername || !content || !category) return;
    
    resetHandler();
    history.push("/mymessages");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setCustomername(userInfo.name);
    }
  }, [history, userInfo]);


  return (
    <MainScreen title="Ask your Query">
      <Card>
        <Card.Header>Create a new Query</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="title"
                value={customername}
                placeholder="Enter Your Name"
                onChange={(e) => setCustomername(e.target.value)}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter Query.."
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Lone Issue">Lone Issue</option>
                <option value="Number Update">Number Update</option>
                <option value="Form Issue">Form Issue</option>
                <option value="Query">Query</option>
              </Form.Control>
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Query
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateMessage;