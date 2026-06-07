import { useState } from "react";

type ChatInputProps = {
    onSend: (message: string) => void;
};

export default function ChatInput({ onSend, }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        onSend(message);
        setMessage("");
    };

    const handleKeyDown = (  e: React.KeyboardEvent<HTMLTextAreaElement>, ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-slate-800 p-4">
            <div className="mx-auto max-w-4xl">
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your emails..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none"
                />

                <div className="mt-3 flex justify-end">
                    <button
                        onClick={handleSend}
                        className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}