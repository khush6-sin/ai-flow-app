const axios = require("axios");
const mongoose = require("mongoose");
const Flow = require("./models/Flow");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
          {
            role: "system",
            content:
              "You are a Helping assistance. Answer in 2-3 short sentences and keep the answer concise. do ot use any any bullet points and astricks (*) keep the text plain  ",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const aiText = response.data.choices[0].message.content;

    res.json({ answer: aiText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.post("/api/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const newFlow = new Flow({
      prompt,
      response,
    });

    await newFlow.save();

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Save failed" });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
