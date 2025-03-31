import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestions";

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/chat/")
            .then((res) => setQuestions(res.data))
            .catch((err) => console.error("Error al obtener preguntas", err));
    }, []);

    return (
        <section className="home">
            <div className="container">
                <h1 onClick={() => window.location.reload()} style={{ cursor: "pointer", textDecoration: "underline" }}>
                    GIDEON
                </h1>
                <AddQuestion setQuestions={setQuestions} />
                <div className="questions-gallery">
                    {questions.map((q, index) => (
                        <div key={index} className="question-item">
                            <strong>{q.user}</strong>
                            <p>{q.bot}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;