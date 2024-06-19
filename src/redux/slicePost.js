import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: {},
};

const slicePost = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts(state, action){
            state.posts = action.payload;
        }
    }
});

export default slicePost.reducer;

export function SetPosts(post){
    return (dispatch, getState) => {
        dispatch(slicePost.actions.getPosts(post));
    }
}