import {
  MESSAGES_CREATE_FAIL,
  MESSAGES_CREATE_REQUEST,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_DELETE_FAIL,
  MESSAGES_DELETE_REQUEST,
  MESSAGES_DELETE_SUCCESS,
  MESSAGES_LIST_FAIL,
  MESSAGES_LIST_REQUEST,
  MESSAGES_LIST_SUCCESS,
  MESSAGES_UPDATE_FAIL,
  MESSAGES_UPDATE_REQUEST,
  MESSAGES_UPDATE_SUCCESS,
} from "../constants/messagesConstants";
import axios from "axios";

export const agentallmessages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGES_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/messages/getallmessages`);
    console.log(data);
    dispatch({
      type: MESSAGES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const listMessages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/messages`, config);

    dispatch({
      type: MESSAGES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const createMessageAction = (customername, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MESSAGES_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/messages/create`,
      { customername, content, category },
      config
    );

    dispatch({
      type: MESSAGES_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_CREATE_FAIL,
      payload: errorMessage,
    });
  }
};

export const deleteMessageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/messages/${id}`, config);

    dispatch({
      type: MESSAGES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_DELETE_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateMessageAction = (id, customername, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MESSAGES_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/messages/${id}`,
      { customername, content, category },
      config
    );

    dispatch({
      type: MESSAGES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_UPDATE_FAIL,
      payload: errorMessage,
    });
  }
};


export const agentupdateMessageAction = (id, Response) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MESSAGES_UPDATE_REQUEST,
    });

    const { data } = await axios.post(
      `/api/messages/respon`,
      { id, Response },
    );

    dispatch({
      type: MESSAGES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGES_UPDATE_FAIL,
      payload: errorMessage,
    });
  }
};
