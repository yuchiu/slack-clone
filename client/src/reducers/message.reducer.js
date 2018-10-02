import constants from "@/constants";
import { createSelector } from "reselect";

import { getCurrentUser } from "./user.reducer";

const initialState = {
  messageList: []
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.CHANNEL_ASSOCIATED_LIST_FETCH:
      newState.messageList = action.payload.messageList;
      return newState;

    case constants.MESSAGE_RECEIVE_SOCKET:
      if (
        action.payload.message.channelId === action.payload.currentChannel.id
      ) {
        newState.messageList = state.messageList.concat(action.payload.message);
      }
      return newState;

    case constants.SOCKET_CONNECTION_CLEAR:
      newState.messageList = [];
      return newState;

    case constants.MESSAGE_MORE_FETCH:
      newState.messageList = action.payload.messageList.concat(
        state.messageList
      );
      return newState;

    case constants.USER_LOGOUT_FETCH:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getStateMessageList = state => state.messageReducer.messageList;

/* derived data selectors */
const getMessageList = createSelector(
  getStateMessageList,
  getCurrentUser,
  (messageList, currentUser) =>
    messageList.map(message => {
      const newMessage = { ...message };
      newMessage.imageType = false;
      newMessage.textType = false;
      newMessage.audioType = false;
      newMessage.isCurrentUser = false;
      if (newMessage.filetype) {
        if (newMessage.filetype.startsWith("image/")) {
          newMessage.imageType = true;
        }
        if (message.filetype === "text/plain") {
          newMessage.textType = true;
        }
        if (message.filetype.startsWith("audio/")) {
          newMessage.audioType = true;
        }
      }
      if (newMessage.userId === currentUser.id) {
        newMessage.isCurrentUser = true;
      }
      return newMessage;
    })
);

export { getMessageList };
