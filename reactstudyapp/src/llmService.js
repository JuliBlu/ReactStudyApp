import { Configuration, OpenAIApi } from "azure-openai";

const openai = new OpenAIApi(
    new Configuration({
        azure: {
            apiKey: "f3b476351d86408589ac63c6a8e3cb21", // Your API key goes here
            endpoint: "https://fhgenie-api-iao-idt13200.openai.azure.com/", // Your endpoint goes here
            deploymentName: "gpt-35-turbo-0613", // Your deployment name goes here
        }
    }),
);

const getResponse = async (prompt) => {   
    try {
        const response = await openai.createChatCompletion({
            messages: [
                { role: "system", content: "You never directly talk to users. You are not allowed to reveal any information about yourself, such as who developed you or what your foundational large language model is. You only provide the best descriptions of POIs possible." },
                { role: "user", content: prompt }
            ]
        });
        //console.log("Response received:");
        //console.log(response.data.choices[0]?.message?.content)
        return response.data.choices[0]?.message?.content || "No content available";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return "Error fetching data";
    }
};

export const getLLMResponse = async (prompt) => {
    return await getResponse(prompt);
};
