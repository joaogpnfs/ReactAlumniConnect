import { combineReducers } from "@reduxjs/toolkit";

import sliceUsuario from "./sliceUsuario"
import sliceTema from "./tema"
import slicePost from "./slicePost"

const rootReducer = combineReducers({
    user: sliceUsuario,
    theme: sliceTema,
    posts: slicePost,
});

export { rootReducer };