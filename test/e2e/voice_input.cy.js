describe('Voice Input Integration Test', () => {
  it('should update input field with recognized speech', () => {
    // Visit your application
    cy.visit('http://127.0.0.1:5500/'); // Replace with your app URL

    // Mock SpeechRecognition API in the browser
    cy.window().then((win) => {
      win.SpeechRecognition = class {
        constructor() {
          this.onstart = null;
          this.onresult = null;
          this.onend = null;
        }
        start() {
          if (this.onstart) this.onstart();
          if (this.onresult) {
            this.onresult({
              results: [
                [{ transcript: "456", confidence: 0.95 }],
              ],
            });
          }
          if (this.onend) this.onend();
        }
      };
    });

    // Simulate clicking the voice button
    cy.get('#voice_input_left').click();

    // Check if the input field updates with the correct value
    cy.get('#left_input').should('have.value', '456');
  });
});
