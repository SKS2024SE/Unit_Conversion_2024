document.getElementById("request-mic-access").addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted.");
        alert("Microphone access has been successfully enabled!");
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
        alert(
          "Microphone access is required for speech recognition. Please enable it in your browser settings."
        );
      });
  });