import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { agentupdateMessageAction } from "../../actions/messagesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleMessage({ match, history }) {
  const [customername, setCustomername] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [response, setResponse] = useState();

  const dispatch = useDispatch();

  const messageUpdate = useSelector((state) => state.messageUpdate);
  const { loading, error } = messageUpdate;

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${match.params.id}`);
        setCustomername(data.customername);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
        
        if (response === undefined) {
          dispatch(agentupdateMessageAction(match.params.id, "agentresponsing"));
        }
      } catch (error) {
        // Handle any potential errors here
        console.error("Error fetching message:", error);
      }
    };

    fetching();
  }, [match.params.id, date, dispatch]);

  const goback = () => {
    dispatch(agentupdateMessageAction(match.params.id, response));    
    history.push("/Agentmymessages");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(agentupdateMessageAction(match.params.id, response));
    if (!response) return;
    history.push("/Agentmymessages");
  };

  return (
    <MainScreen title="Customer Query">
      <Card>
        <Card.Header>Customer Query</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Name"
                value={customername}
                onChange={(e) => setCustomername(e.target.value)}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Query"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="eg:- Lone issue, Form issue, Query"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Response</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Response"
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Response
            </Button>
            <Button variant="danger" type="submit" style={{ marginLeft: '4px' }}
            onClick={goback}
            >
               Don't know
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
