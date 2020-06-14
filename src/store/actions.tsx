import ActionType from "./actionTypes";

export const createUserRequest = user => {
  return {
    type: ActionType.CREATE_USER,
    payload: { user }
  };
};

export const deleteUserRequest = user => {
  return {
    type: ActionType.DELETE_USER,
    payload: { user }
  };
};
