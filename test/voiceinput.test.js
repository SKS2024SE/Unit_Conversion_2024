// // Import the file to be tested
// global.SpeechRecognition = global.webkitSpeechRecognition = class {};
// require('../code/main_scripts/voice_input_output.js');

// // Mocking SpeechRecognition
// // class MockSpeechRecognition {
// //   constructor() {
// //     this.continuous = false;
// //     this.lang = 'en-US';
// //     this.onstart = null;
// //     this.onresult = null;
// //     this.onend = null;
// //     this.onerror = null;
// //   }

// //   start() {
// //     if (this.onstart) this.onstart(); // Trigger start event
// //     setTimeout(() => {
// //       // Simulate speech recognition result
// //       if (this.onresult) {
// //         this.onresult({
// //           results: [
// //             [{ transcript: "123", confidence: 0.9 }],
// //           ],
// //         });
// //       }
// //       if (this.onend) this.onend(); // Trigger end event
// //     }, 100);
// //   }

// //   stop() {
// //     if (this.onend) this.onend();
// //   }
// // }

// // // Set up mock globally
// // global.SpeechRecognition = MockSpeechRecognition;
// // global.webkitSpeechRecognition = MockSpeechRecognition;

// // // Jest Tests
// // describe('Voice Input Functionality', () => {
// //   let voiceButton, inputField;

// //   beforeEach(() => {
// //     // Setup the DOM
// //     document.body.innerHTML = `
// //       <button id="voice_input_left">🎤</button>
// //       <input id="left_input" value="" />
// //     `;
// //     require('../code/main_scripts/voice_input_output.js');
// //     voiceButton = document.getElementById('voice_input_left');
// //     inputField = document.getElementById('left_input');
// //   });

// //   test('Starts listening and updates input field with recognized speech', (done) => {
// //     voiceButton.click();

// //     setTimeout(() => {
// //       expect(inputField.value).toBe("123");
// //       done(); // Indicate the test is complete
// //     }, 200);
// //   });

// //   test('Handles microphone access errors gracefully', () => {
// //     jest.spyOn(navigator.mediaDevices, 'getUserMedia').mockImplementation(() => {
// //       return Promise.reject(new Error('Microphone access denied'));
// //     });

// //     jest.spyOn(window, 'alert').mockImplementation(() => {});

// //     voiceButton.click();

// //     expect(window.alert).toHaveBeenCalledWith(
// //       'Microphone access is required for speech recognition. Please enable it in your browser settings.'
// //     );
// //   });
// // });
// // Mock global objects
// global.SpeechRecognition = class MockSpeechRecognition {
//     constructor() {
//       this.onstart = null;
//       this.onresult = null;
//       this.onend = null;
//       this.onerror = null;
//     }
//     start() {
//       if (this.onstart) this.onstart();
//       setTimeout(() => {
//         if (this.onresult) {
//           this.onresult({
//             results: [
//               [{ transcript: "123", confidence: 0.9 }],
//             ],
//           });
//         }
//         if (this.onend) this.onend();
//       }, 500);
//     }
//     stop() {
//       if (this.onend) this.onend();
//     }
//   };
  
//   global.alert = jest.fn(); // Mock alert
//   Object.defineProperty(global.navigator, 'mediaDevices', {
//     value: {
//       getUserMedia: jest.fn(() => Promise.resolve()), // Mock getUserMedia
//     },
//     writable: true,
//   });
  
//   // Test cases
//   describe('Voice Input Functionality', () => {
//     let voiceButton, inputField;
  
//     beforeEach(() => {
//       document.body.innerHTML = `
//         <button id="voice_input_left">🎤</button>
//         <input id="left_input" value="" />
//       `;
//       require('../code/main_scripts/voice_input_output.js'); // Adjust path as needed
//       voiceButton = document.getElementById('voice_input_left');
//       inputField = document.getElementById('left_input');
//     });
  
//     test(
//       'Starts listening and updates input field with recognized speech',
//       (done) => {
//         voiceButton.click();
  
//         setTimeout(() => {
//           expect(inputField.value).toBe("123"); // Check updated value
//           done();
//         }, 1000); // Wait for mock result
//       },
//       10000 // Increase timeout for async operations
//     );
  
//     test('Handles microphone access errors gracefully', async () => {
//       navigator.mediaDevices.getUserMedia.mockImplementationOnce(() =>
//         Promise.reject(new Error('Microphone access denied'))
//       );
  
//       voiceButton.click();
  
//       expect(global.alert).toHaveBeenCalledWith(
//         'Microphone access is required for speech recognition. Please enable it in your browser settings.'
//       );
//     });
//   });
