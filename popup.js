document.getElementById("downloadTranscript").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: fetchTranscript
        });
    });
});

document.getElementById("summarize").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: async () => {
                const transcript = await fetchTranscript();
                chrome.runtime.sendMessage({ action: "summarize", transcript }, (response) => {
                    document.getElementById("summary").innerText = response.summary;
                });
            }
        });
    });
});
