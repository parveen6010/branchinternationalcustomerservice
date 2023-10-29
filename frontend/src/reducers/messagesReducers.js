import {
  MESSAGES_UPDATE_REQUEST,
  MESSAGES_UPDATE_SUCCESS,
  MESSAGES_UPDATE_FAIL,
  MESSAGES_CREATE_FAIL,
  MESSAGES_CREATE_REQUEST,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_DELETE_FAIL,
  MESSAGES_DELETE_REQUEST,
  MESSAGES_DELETE_SUCCESS,
  MESSAGES_LIST_FAIL,
  MESSAGES_LIST_REQUEST,
  MESSAGES_LIST_SUCCESS,
  AGENTMESSAGES_LIST_REQUEST,
  AGENTMESSAGES_LIST_SUCCESS,
  AGENTMESSAGES_LIST_FAIL,
} from "../constants/messagesConstants";

export const messageListReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGES_LIST_REQUEST:
      return { loading: true };
    case MESSAGES_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case MESSAGES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const messageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_CREATE_REQUEST:
      return { loading: true };
    case MESSAGES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case MESSAGES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const messageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_DELETE_REQUEST:
      return { loading: true };
    case MESSAGES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MESSAGES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const messageUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_UPDATE_REQUEST:
      return { loading: true };
    case MESSAGES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MESSAGES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const agentMessageListReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case AGENTMESSAGES_LIST_REQUEST:
      return { loading: true };
    case AGENTMESSAGES_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case AGENTMESSAGES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
