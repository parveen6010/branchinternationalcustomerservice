

import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction, listMessages } from "../../actions/messagesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyMessages({ history, search }) {
  const dispatch = useDispatch();

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, messages } = messageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const messageDelete = useSelector((state) => state.messageDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = messageDelete;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success: successCreate } = messageCreate;

  // const messageUpdate = useSelector((state) => state.messageUpdate);
  // const { success: successUpdate } = messageUpdate;

  useEffect(() => {
    dispatch(listMessages());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMessageAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Link to="/createmessage">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Ask Query
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {messages &&
        [...messages]
          .filter((filteredMessage) =>
            filteredMessage.customername.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => (a.Response && !b.Response ? -1 : 1))
          .map((message) => (
            <Accordion key={message._id}>
              <Card
                style={{
                  margin: 10,
                  border: message.Response ? "2px solid yellow" : "1px solid black",
                }}
              >
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                      {message.content}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => deleteHandler(message._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">Category - {message.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{message.customername}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {message.createdAt.substring(0, 10)}
                        </cite>
                        {message.Response && (
                          <div>
                            <h4>
                              <Badge variant="success">Response</Badge>
                            </h4>
                            <h5>
                              <ReactMarkdown>{message.Response}</ReactMarkdown>
                            </h5>
                          </div>
                        )}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyMessages;
