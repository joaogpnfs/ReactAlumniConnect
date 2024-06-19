import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: JSON.parse(window?.localStorage.getItem('theme')) ?? "dark",

}

const sliceTema = createSlice({
    name: "theme",
    initialState,
    reducers:{
        setTema(state,action){
            state.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(action.payload))
        }
    }
});

export default sliceTema.reducer;

export function SetTema(valor) {
    return (dispatch) =>{
        dispatch(sliceTema.actions.setTema(valor))
    }
}