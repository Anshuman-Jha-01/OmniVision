require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// // CORS setup
// app.use(
//   cors({
//     origin: "chrome-extension://hmlnclnnelpbmclhfnknhgkephahkmjf",
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // Optional: Manually handle OPTIONS if needed
// app.options("/analyze", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // use “*” instead of your URL to allow request from everywhere
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/analyze", async (req, res) => {
  const { content } = req.body;

  try {
    const prompt = `You are an AI content safety and moderation specialist. Your task is to analyze the given text input carefully and evaluate it in three distinct categories: Toxicity, NSFW (Not Safe For Work), and Unhealthy Language. For each category, identify whether the text contains any offending elements, describe the nature of such content, and provide a severity rating on a scale from 1 to 5 (1 = very mild, 5 = extremely severe). Additionally, suggest specific improvements or safer alternatives where applicable.
                    Instructions:
                        Toxicity Analysis: 
                            Determine if the text includes any toxic content such as hate speech, harassment, threats, bullying, or discriminatory language. 
                            Identify the targeted group or individual if applicable.
                            Assess the severity and impact of the toxicity.

                        NSFW Content Identification:
                            Check for explicit sexual content, graphic descriptions, or any adult-oriented material.
                            Distinguish between mild suggestive language and explicit NSFW content.
                            Provide context if content is borderline.

                        Unhealthy Language Detection:
                            Look for language that promotes self-harm, eating disorders, substance abuse, or harmful behaviors.
                            Identify any language that encourages mental or physical harm to oneself or others.
                            Rate the potential harm impact.

                    Output Format:
                        Provide your analysis in a structured JSON format containing these keys:
                        {
                        "toxicity": {
                            "present": true/false,
                            "description": "Detailed explanation of toxic elements found.",
                            "severity": 1-5,
                            "targets": ["list of targeted groups or individuals if any"]
                        },
                        "nsfw": {
                            "present": true/false,
                            "description": "Explanation of NSFW content detected.",
                            "severity": 1-5
                        },
                        "unhealthy_language": {
                            "present": true/false,
                            "description": "Details on unhealthy or harmful language in the text.",
                            "severity": 1-5
                        },
                        "recommendations": "Suggestions for rephrasing or removing harmful content."
                        }
                    Here is the content: \n\n${content}`;

    const result = await model.generateContent(prompt);
    const textResult = result.response.text();

    res.send({ textResult });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Gemini analysis failed" });
  }
});

app.listen(3000, () => console.log("Gemini backend running on port 3000"));
