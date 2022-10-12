import { createStore } from "redux";
import { GithubReducer } from "./Reducer";


export const Store = createStore(GithubReducer);