import { act } from "react-dom/test-utils";

const initialState = [];
const userPosts = (state = initialState, action) => {
    switch (action.type) {
        case "ADDPOSTS":
            return [
                ...state,
                {
                    userId: action.payload.id,
                    title: action.payload.title,
                    body: action.payload.body
                },
            ];
        default:
            return state;
    }
};

export default userPosts;
