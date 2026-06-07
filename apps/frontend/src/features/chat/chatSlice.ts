import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../../types/chat";

interface ChatState {
    messages: Message[];
    isLoading: boolean;

}

const initialState: ChatState = {
    messages: [{ role: "assistant", message: '👋 Welcome to MailPilot.' }],
    isLoading: false,

}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        clearMessage: (state) => {
            state.messages = [];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})

export const { addMessage, clearMessage, setLoading } = chatSlice.actions;

export default chatSlice.reducer