const Message = require("../models/Message");

const chatResponse = async (req, res) => {
    const { userMessage } = req.body;

    const responses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "adiós": "¡Hasta luego!"
    };

    const botResponse = responses[userMessage.toLowerCase()] || "Lo siento, no entiendo esa pregunta.";

    const message = new Message({ user: userMessage, bot: botResponse });
    await message.save();

    res.json({ botMessage: botResponse });
};

const addChat = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newChat = new Message({ user: question, bot: answer });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: "Error al guardar la pregunta", error });
    }
};

const getChats = async (req, res) => {
    try {
        const chats = await Message.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

module.exports = { chatResponse, addChat, getChats };
