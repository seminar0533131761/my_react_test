import { combineReducers } from "redux";
import userPosts from "./userPosts";

const allReducers = combineReducers({
    userPosts: userPosts
});
export default allReducers;