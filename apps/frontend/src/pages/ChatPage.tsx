
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";


import { addMessage, setLoading } from "../features/chat/chatSlice";

import { useAppDispatch } from "../hooks/redux";
import { useAppSelector } from "../hooks/redux";

import { sendMessage } from "../services/chatApi";

export default function ChatPage() {
    const dispatch = useAppDispatch();

    const messages = useAppSelector(
        (state) => state.chat.messages,
    );
    const isLoading = useAppSelector(
        (state) => state.chat.isLoading,
    );
    const handleSend = async (message: string,) => {
        dispatch(addMessage({ role: "user", message, }),);
        dispatch(setLoading(true));

        try {
            const data = await sendMessage(message);

            dispatch(addMessage({ role: "assistant", message: data.reply, }),
            );
        } catch (error) {
            dispatch(
                addMessage({
                    role: "assistant",
                    message:
                        "Something went wrong.",
                }),
            );
        } finally {
            dispatch(setLoading(false));
        }
    };



    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />

            <main className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-4xl">
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                role={msg.role}
                                message={msg.message}
                            />
                        ))}

                        {
                            isLoading && (
                                <ChatMessage
                                    role="assistant"
                                    message="Thinking..."
                                />
                            )
                        }
                    </div>
                </div>

                <ChatInput onSend={handleSend} />
            </main>
        </div>
    );
}