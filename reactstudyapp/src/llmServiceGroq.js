// llmService.js
/*
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


// llmService.js
export const getLLMResponse = async (prompt) => {
    const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
    const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
    const deploymentId = process.env.REACT_APP_AZURE_OPENAI_DEPLOYMENT_ID;

    try {
        const response = await fetch(`${endpoint}/openai/deployments/${deploymentId}/completions?api-version=2023-03-15-preview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100,  // Adjust max tokens based on your requirements
                temperature: 0.7,  // Adjust temperature based on your requirements
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0]?.text.trim() || "No content available";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return "Error fetching data";
    }
};
*/