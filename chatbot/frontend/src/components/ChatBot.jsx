import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { userMessage: input };
        setMessages((prev) => [...prev, { user: input, bot: "..." }]);
        setInput("");

        try {
            const response = await axios.post("http://localhost:5000/api/chat/message", userMessage);
            setMessages((prev) => [...prev.slice(0, -1), { user: input, bot: response.data.botMessage }]);
        } catch (error) {
            console.error("Error enviando mensaje", error);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p className="user-message"><strong>Tú:</strong> {msg.user}</p>
                        <p className="bot-message"><strong>Bot:</strong> {msg.bot}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatBot;