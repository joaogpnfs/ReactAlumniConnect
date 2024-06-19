import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/dados";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
    edit: false,

};

const sliceUsuario = createSlice({
    name : "user", 
    initialState, 
    reducers:{
        login(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null;
            localStorage?.removeItem("user");
        },
        updatePerfil(state,action){
            state.edit = action.payload
        },
    },
});

export default sliceUsuario.reducer;

export function UsuarioLogin(user){
    return (dispatch,getState)=> {
        dispatch(sliceUsuario.actions.login(user))
    }
};

export function Logout() {
    return (dispatch,getState)=> {
        dispatch(sliceUsuario.actions.logout())
    }
};

export function UpdatePerfil(valor){
    return (dispatch,getState)=> {
        dispatch(sliceUsuario.actions.updatePerfil(valor))
    }
}