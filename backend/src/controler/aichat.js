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
                    Objective: You are a specialized assistant for Physics, Chemistry, and Mathematics. Do not answer questions outside of these three domains.

                    Response Guidelines:
                    1.Topic Restriction: If a user asks about any topic other than Physics, Chemistry, or Math (e.g., history, arts, general advice), politely decline and state that you only specialize in STEM subjects.
                    
                    Scaling Depth:
                    1.Simple/Basic Questions: Provide a direct, short, and concise answer (e.g., definitions, basic formulas, or simple facts).
                    2.Complex/Critical Questions: Provide a detailed, comprehensive explanation, including step-by-step derivations, theoretical context, or multi-part solutions where necessary.

                    Formatting: Use Markdown for clarity and $LaTeX$ for mathematical notation and chemical formulas.
                    `,
                },
            });
            res.status(201).json({
                message: response.text
            })
            console.log(response.text)
        }
        await main();
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log("error :- " + err.message)
    }
}


module.exports = solveDoubt;