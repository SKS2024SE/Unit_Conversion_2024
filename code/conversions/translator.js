var API_KEY = '';

document.addEventListener('DOMContentLoaded', function () {
    const translateButton = document.getElementById("translateButton");
    const inputText = document.getElementById("inputText");
    const currentLanguage = document.getElementById('currentLanguage');
    const targetLanguage = document.getElementById("targetLanguage");
    const resultDiv = document.getElementById("result");

    translateButton.addEventListener("click", async () => {
        console.log('Inside click');
        const text = inputText.value;
        const currentLanguageT = currentLanguage.value;
        const language = targetLanguage.value;

        if (!text) {
            resultDiv.textContent = "Please enter text to translate.";
            return;
        }

        resultDiv.textContent = "Translating...";

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}` // Replace with your OpenAI API key
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful translator."
                        },
                        {
                            role: "user",
                            content: `Translate the following text in ${currentLanguageT} to ${language}: "${text}"`
                        }
                    ],
                    max_tokens: 100
                })
            });

            const data = await response.json();
            const translatedText = data.choices[0].message.content;
            resultDiv.textContent = translatedText;

        } catch (error) {
            resultDiv.textContent = "Error translating text. Please try again.";
            console.error(error);
        }
    });

})