import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { agentallmessages } from "../../actions/messagesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function AgentMyMessages({ history, search }) {
  const dispatch = useDispatch();
  const [respondingMessageId, setRespondingMessageId] = useState(null);

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, messages } = messageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(agentallmessages());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  const messagesWithResponse = messages ? messages.filter((message) => message.Response) : [];
  const messagesWithoutResponse = messages ? messages.filter((message) => !message.Response) : [];

  const sortedMessages = messages
    ? [
      ...messagesWithResponse.sort((a, b) => {
        if (a.Response === "agentresponding" && b.Response !== "agentresponding") return -1;
        if (a.Response !== "agentresponding" && b.Response === "agentresponding") return 1;
        // Additional sorting logic based on other conditions if necessary
        return 0;
      }),
        ...messagesWithoutResponse.sort((a, b) => {
          if (a.Response === "agentresponding") return -1;
          if (b.Response === "agentresponding") return 1;
          if (a.category === "Lone Issue") return -1;
          if (b.category === "Lone Issue") return 1;
          if (a.category === "Number Update" && b.category !== "Number Update") return -1;
          if (a.category !== "Number Update" && b.category === "Number Update") return 1;
          if (a.category === "Form Issue" && b.category !== "Form Issue") return -1;
          if (a.category !== "Form Issue" && b.category === "Form Issue") return 1;
          if (a.category === "Query" && b.category !== "Query") return 1;
          if (a.category !== "Query" && b.category === "Query") return -1;
          return 0;
        }),
       
      ]
    : [];

  const isMessageResponding = (messageId) => {
    return respondingMessageId === messageId;
  };

  const disableButton = (message) => {
    return message.Response || isMessageResponding(message._id);
  };

  const handleResponse = (messageId) => {
    setRespondingMessageId(messageId);
  };

  const handleFinishResponse = () => {
    setRespondingMessageId(null);
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {sortedMessages &&
        sortedMessages
          .filter((filteredMessage) => filteredMessage.customername.toLowerCase().includes(search.toLowerCase())).reverse()
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
                      disabled={disableButton(message)}
                      className={message.Response ===  "agentresponsing" ? "btn btn-success" : message.Response ? "btn btn-danger" : ""}
                      onClick={() => handleResponse(message._id)}
                    >
                      {message.Response !== "agentresponsing" ? "Responsed" : message.Response ?  "responding" :  "Response" }
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
                        </cite>
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

export default AgentMyMessages;





