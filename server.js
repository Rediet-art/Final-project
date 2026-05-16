import express from "express";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static(__dirname));



const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

app.post("/generate", async (req, res) => {
  const { question , level } = req.body;

    let systemPrompt = "";

        if (level === "5-8") {
          systemPrompt = `
        You are a friendly teacher for children aged 5–8.

        Rules:
        - Use very simple words
        - Use short sentences
        - Use fun examples (toys, animals, school)
        - Keep it under 3–4 sentences
        - Make it playful and easy to understand
        `;
        } else {
          systemPrompt = `
        You are a helpful teacher for children aged 8–12.

        Rules:
        - Use simple but slightly more detailed explanations
        - You can introduce basic concepts
        - Give clear examples
        - Keep it under 5–6 sentences
        `;
      }

  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token)
    );

    const response = await client.path("/chat/completions").post({
      body: {
       messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Explain this: ${question}` }
       ],
        model: model
      }
    });
    console.log("FULL RESPONSE:", response.body);

    const message = response.body?.choices?.[0]?.message?.content;

    let result = "No response from AI";

        if (typeof message === "string") {
        result = message;
        } else if (Array.isArray(message) && message[0]?.text) {
        result = message[0].text;
        }

    res.json({ explanation: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
});
  app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
