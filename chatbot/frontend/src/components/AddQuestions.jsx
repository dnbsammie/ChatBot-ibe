import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddQuestion = ({ setQuestions }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate(); // 🔹 Agregado para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/chat/add", {
                user: question,
                bot: answer
            });
            setQuestions(prev => [...prev, response.data]);
            alert("✅ Pregunta agregada con éxito");
            setQuestion("");
            setAnswer("");
        } catch (error) {
            console.error("❌ Error al agregar la pregunta:", error);
            alert("❌ Error al agregar la pregunta");
        }
    };

    return (
        <div className="add-question-container">
            <h2>Agregar Pregunta</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-layout">
                    <label>Pregunta:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                    <label>Respuesta:</label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>

                <div className="row">
                    <button type="submit" className="btn btn-submit">Guardar</button>
                    <button
                        type="button"
                        className="btn btn-chat"
                        onClick={() => navigate("/chat")}
                    >
                        Usar Chat
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestion;