type ChatMessageProps = {
    message: string;
    role: "user" | "assistant";
};

export default function ChatMessage({ message, role,}: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start" }`} >
            <div
                className={`max-w-xl rounded-xl p-4 ${isUser ? "bg-blue-600" : "bg-slate-900" }`}>
                {message}
            </div>
        </div>
    );
}