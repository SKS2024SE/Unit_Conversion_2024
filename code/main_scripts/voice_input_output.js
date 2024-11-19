// Function to start speech recognition
function startSpeechRecognition(inputElementId) {
    console.log("Initializing SpeechRecognition...");
    
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.error('SpeechRecognition API is not supported in this browser.');
      alert('SpeechRecognition is not supported in your browser. Please try Google Chrome.');
      return;
    }
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    recognition.onstart = () => {
      console.log('Voice input started...');
    };
  
    recognition.onspeechend = () => {
      console.log('Voice input ended.');
      recognition.stop();
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(`Recognized text: ${transcript}`);
      document.getElementById(inputElementId).value = transcript;
    };
  
    recognition.onerror = (event) => {
      console.error('Error recognizing speech:', event.error);
      alert(`Error recognizing speech: ${event.error}`);
    };
  
    recognition.start();
  }
  
  // Add event listener
  document.getElementById('voice_input_left').addEventListener('click', () => {
    console.log('Mic button clicked.');
    startSpeechRecognition('left_input');
  });
  

  // Function to speak the text
function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
  
    utterance.lang = 'en-US'; // Set language
    utterance.pitch = 1; // Pitch
    utterance.rate = 1; // Speed
    utterance.volume = 1; // Volume
  
    synth.speak(utterance);
  }
  
  // Add event listener for voice output button
  document.getElementById('voice_output_right').addEventListener('click', () => {
    const output = document.getElementById('right_input').value;
    if (output) {
      speakText(`The result is ${output}`);
    } else {
      speakText('No result to speak.');
    }
  });