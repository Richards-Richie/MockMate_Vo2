import {createSlice} from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name : "questions",
    initialState : {
        list : [],
    },
    reducers:{
        setQuestions:(state,action)=>{
            state.list = action.payload;
        },
        clearQuestions:(state)=>{
            state.list=[];
        }
    }
});

export const {setQuestions,clearQuestions} = questionSlice.actions;
export default questionSlice.reducer;