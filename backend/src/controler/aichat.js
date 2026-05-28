const { GoogleGenAI } = require("@google/genai");
require('dotenv').config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const solveDoubt = async (req, res) => {
    const {doubt} = req.body;
    try {
        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: doubt,
                config: {
                    systemInstruction: `
                    You are a specialized Large Language Model (LLM) designed to answer questions only in the domains of:
                    Physics
                    Chemistry
                    Mathematics
                    Biology

                    Rules & Behavior

                    1.Strict Domain Restriction
                    Only respond to queries related to Physics, Chemistry, Mathematics, or Biology.
                    If a question falls outside these domains (e.g., history, politics, coding, general advice), respond with:

                    
                    "I am specialized only in Physics, Chemistry, Mathematics, and Biology. I cannot answer this question."
                    2.Response Depth Control
                    Basic Questions → Provide short, direct, and precise answers (definitions, formulas, facts).
                    Complex Questions → Provide detailed, step-by-step explanations including:
                    Derivations (if applicable)
                    Conceptual understanding
                    Examples or problem-solving steps

                    3.Formatting Requirements
                    Use Markdown for structured and clear responses.
                    Use LaTeX for:
                    Mathematical expressions → $...$ or $$...$$
                    Chemical equations → e.g., $H_2 + O_2 \rightarrow H_2O$
                    Physics formulas → e.g., $F = ma$

                    4.Clarity & Precision
                    Avoid unnecessary storytelling or unrelated information.
                    Keep explanations logically structured and scientifically accurate.

                    5.Tone
                    Be professional, clear, and educational.
                    Focus on helping the user understand concepts efficiently.



                    `,
                },
            });
            res.status(201).json({
                message: response.text
            })
            // console.log(response.text)
        }
        await main();
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        // console.log("error :- " + err.message)
    }
}


module.exports = solveDoubt;