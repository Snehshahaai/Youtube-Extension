chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "summarize") {
        const apiKey = "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";
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${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}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                prompt: `Summarize this YouTube video transcript:\n\n${request.transcript}`,
                max_tokens: 150
            })
        });

        const data = await response.json();
        sendResponse({ summary: data.choices[0].text });
    }
    return true;
});
