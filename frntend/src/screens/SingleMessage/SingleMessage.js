

import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction, updateMessageAction } from "../../actions/messagesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";


function SingleMessage({ match, history }) {
  const [customername, setCustomername] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const messageUpdate = useSelector((state) => state.messageUpdate);
  const { loading, error } = messageUpdate;

  const messageDelete = useSelector((state) => state.messageDelete);
  const { loading: loadingDelete, error: errorDelete } = messageDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMessageAction(id));
    }
    history.push("/mymessages");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/messages/${match.params.id}`);

      setCustomername(data.customername);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setCustomername("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateMessageAction(match.params.id, customername, content, category));
    if (!customername || !content || !category) return;

    resetHandler();
    history.push("/mymessages");
  };

  return (
    <MainScreen title="Edit Query">
      <Card>
        <Card.Header>Edit your Query</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter your Name"
                value={customername}
                onChange={(e) => setCustomername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Query"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
         

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="eg:- Lone issue, Form issue, Query"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Query
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Query
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleMessage;