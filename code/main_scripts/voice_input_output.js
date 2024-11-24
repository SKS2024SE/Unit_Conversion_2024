const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false; // Stops listening after a single result
  recognition.lang = 'en-US';

  document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.getElementById('voice_input_left');
    const inputField = document.getElementById('left_input');

    if (voiceButton) {
      // Add click event listener for the voice button
      voiceButton.addEventListener('click', () => {
        // Request microphone access and start recognition
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            recognition.start();
            voiceButton.textContent = '🎤 Listening...'; // Indicate listening state
          })
          .catch((error) => {
            console.error('Microphone access denied:', error);
            alert(
              'Microphone access is required for speech recognition. Please enable it in your browser settings.'
            );
          });
      });
    }

    // Handle speech recognition results
    recognition.addEventListener('result', (event) => {
      const speechToText = event.results[0][0].transcript; // Get the spoken text
      inputField.value = parseFloat(speechToText) || 0; // Parse as a number or default to 0
    });

    // Reset button text when recognition ends
    recognition.addEventListener('end', () => {
      voiceButton.textContent = '🎤'; // Reset button text
    });

    // Handle recognition errors
    recognition.addEventListener('error', (event) => {
      console.error('Speech Recognition Error:', event.error);
      alert(
        `Speech Recognition Error: ${event.error}\nPlease check your microphone settings.`
      );
      voiceButton.textContent = '🎤'; // Reset button text on error
    });
  });
} else {
  console.warn('Speech Recognition is not supported in this browser.');
  alert(
    'Speech Recognition is not supported in this browser. Please use a compatible browser like Google Chrome.'
  );
}