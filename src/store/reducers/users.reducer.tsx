import ActionType from "../actionTypes";
import { v4 as uuidv4 } from "uuid";

const demo = {
  id: uuidv4(),
  firstName: "John",
  lastName: "John",
  date: new Date(),
  phone: "012443543"
};

const initialState = {
  data: [demo]
};

export default function users(
  state = initialState,
  action: { type: ActionType; payload: any }
) {
  switch (action.type) {
    case ActionType.CREATE_USER:
      return { ...state, data: [...state.data, action.payload.user] };

    case ActionType.DELETE_USER:
      const newUsers = state.data.filter(user => {
        return user.id !== action.payload.user.id;
      });

      return { ...state, data: newUsers };

    default:
      return state;
  }
}
