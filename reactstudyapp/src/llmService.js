// llmService.js
import Groq from 'groq-sdk';

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export const getLLMResponse = async (prompt) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192",
        });
        return response.choices[0]?.message?.content || "No content available";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return "Error fetching data";
    }
};
