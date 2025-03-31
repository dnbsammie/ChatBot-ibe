const express = require("express");
const { chatResponse, addChat, getChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/message", chatResponse);
router.post("/add", addChat);
router.get("/", getChats);

module.exports = router;