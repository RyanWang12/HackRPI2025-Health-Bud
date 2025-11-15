import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
const PORT = 8000;

// Enable CORS for all origins (for testing)
app.use(cors());

// Parse JSON requests
app.use(express.json());

app.post("/prompt", async (req, res) => {
  const {
    name,
    age,
    weight,
    diet,
    goal,
    question,
    derivedStats // <-- New field from frontend
  } = req.body;

  if (!name || !age || !weight || !diet || !goal || !question || !derivedStats) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { bmi, calories, sleep, water, energy } = derivedStats;

  const userPrompt = `
You are a friendly health advisor. Respond to the user's question 
informatively and safely by first restating the question and then 
suggesting solutions in bullet points. Include personalized advice 
based on the following user information:

=== USER PROFILE ===
Name: ${name}
Age: ${age}
Weight: ${weight}
Diet Type: ${diet}
Goal: ${goal}

=== HEALTH STATS ===
BMI: ${bmi.value} (${bmi.status})
Daily Calories Target: ${calories}
Recommended Sleep Range: ${sleep[0]} — ${sleep[1]} hours
Water Intake Goal: ${water} cups/day
Energy Level (0–100): ${energy}

=== QUESTION ===
${question}

If the question is not related to health, respond with: 
"It appears what you're asking is not health related. 
Please provide a health-related question."

Make sure your response:
- References the user's metrics (BMI category, energy levels, etc.)
- Explains why each suggestion fits their goal
- Avoids extreme or unsafe health advice
`;

  try {
    const completion = await ai.responses.generate({
      model: "gemini-1.5-flash-latest",
      input: userPrompt
    });

    res.json({
      response: completion.output_text
    });

  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to get response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

