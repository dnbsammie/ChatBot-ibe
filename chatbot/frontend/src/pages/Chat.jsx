import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

const Chat = () => {
    const navigate = useNavigate();

    return (
        <section className="chat">
            <div className="container">
                <h1>Gideon</h1>
                <button onClick={() => navigate("/")}>Volver al Inicio</button>
                <ChatBot />
            </div>
        </section>
    );
};

export default Chat;