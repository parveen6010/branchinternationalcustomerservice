

import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction, agentallmessages } from "../../actions/messagesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function AgentMyMessages({ history, search }) {
  const dispatch = useDispatch();

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, messages } = messageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const messageDelete = useSelector((state) => state.messageDelete);
  // const { loading: loadingDelete, error: errorDelete, success: successDelete } =
  //   messageDelete;

  useEffect(() => {
    dispatch(agentallmessages());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteMessageAction(id));
  //   }
  // };

  const messagesWithResponse = messages ? messages.filter((message) => message.Response) : [];
  const messagesWithoutResponse = messages ? messages.filter((message) => !message.Response) : [];

  const sortedMessages = [
    ...messagesWithoutResponse.sort((a, b) => {
      if (a.category === "Lone Issue") return -1;
      if (b.category === "Lone Issue") return 1;
      if (a.category === "Number Update" && b.category !== "Number Update") return -1;
      if (a.category !== "Number Update" && b.category === "Number Update") return 1;
      if (a.category === "Form Issue" && b.category !== "Form Issue") return -1;
      if (a.category !== "Form Issue" && b.category === "Form Issue") return 1;
      if (a.category === "Quary" && b.category !== "Quary") return 1;
      if (a.category !== "Quary" && b.category === "Quary") return -1;
      return 0;
    }),
    ...messagesWithResponse,
  ];

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {/* {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>} */}
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />} */}
      {sortedMessages &&
        sortedMessages
          .filter(
            (filteredMessage) =>
              filteredMessage.customername.toLowerCase().includes(search.toLowerCase())
          )
          .map((message) => (
            <Accordion key={message._id}>
              <Card style={{ margin: 10 }}>
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
                      {message.customername}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button
                      href={`/messages/respon/${message._id}`}
                      disabled={message.Response}
                      className={message.Response ? "btn btn-danger" : ""}
                    >
                      {message.Response ? "Responded" : "Response"}
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">Category - {message.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {message.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                      {message.Response && (
                        <div>
                          <h4>
                            <Badge variant="success">Responded</Badge>
                          </h4>
                          <h5>
                            <ReactMarkdown>{message.Response}</ReactMarkdown>
                          </h5>
                        </div>
                      )}
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default AgentMyMessages;
