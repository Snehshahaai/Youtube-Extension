document.addEventListener("keydown", (event) => {
    const video = document.querySelector("video");
    if (!video) return;

    switch (event.code) {
        case "Space": // Play/Pause
            event.preventDefault();
            video.paused ? video.play() : video.pause();
            break;
        case "ArrowRight": // Fast Forward
            video.currentTime += 5;
            break;
        case "ArrowLeft": // Rewind
            video.currentTime -= 5;
            break;
        case "KeyS": // Slow down speed
            video.playbackRate -= 0.25;
            break;
        case "KeyF": // Speed up
            video.playbackRate += 0.25;
            break;
        case "KeyP": // Picture-in-Picture Mode
            if (document.pictureInPictureEnabled && !document.pictureInPictureElement) {
                video.requestPictureInPicture();
            }
            break;
    }
});

async function fetchTranscript() {
    const videoId = new URL(window.location.href).searchParams.get("v");
    const response = await fetch(`https://www.youtube.com/api/timedtext?v=${SHT0y9Gq_rk}&lang=en`);
    
    if (!response.ok) {
        alert("Transcript not available!");
        return;
    }
    
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const transcript = Array.from(xml.getElementsByTagName("text"))
                           .map(node => node.textContent)
                           .join("\n");

    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const transcriptBtn = document.createElement("button");
transcriptBtn.innerText = "Download Transcript";
transcriptBtn.style = "position: fixed; bottom: 10px; right: 10px; z-index: 1000;";
transcriptBtn.onclick = fetchTranscript;
document.body.appendChild(transcriptBtn);

