describe('Tech Quiz E2E', () => {
  beforeEach(() => {
    // Mock the API call with a delay to ensure we can test loading state
    cy.intercept('GET', '/api/questions/random', (req) => {
      req.on('response', (res) => {
        // Delay the response by 2 seconds to ensure we can see the loading state
        res.setDelay(2000);
      });
      req.reply({
        statusCode: 200,
        body: [
          {
            _id: '1',
            question: 'Test Question 1',
            answers: [
              { text: 'Answer 1', isCorrect: true },
              { text: 'Answer 2', isCorrect: false },
              { text: 'Answer 3', isCorrect: false },
              { text: 'Answer 4', isCorrect: false }
            ]
          },
          {
            _id: '2',
            question: 'Test Question 2',
            answers: [
              { text: 'Answer 1', isCorrect: false },
              { text: 'Answer 2', isCorrect: true },
              { text: 'Answer 3', isCorrect: false },
              { text: 'Answer 4', isCorrect: false }
            ]
          }
        ]
      });
    }).as('getQuestions');
  });

  it('should complete a full quiz flow', () => {
    cy.visit('/');
    
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Answer first question correctly
    cy.get('h2').should('contain', 'Test Question 1');
    cy.get('button').first().click();

    // Answer second question correctly
    cy.get('h2').should('contain', 'Test Question 2');
    cy.get('button').eq(1).click();

    // Check final score
    cy.get('h2').should('contain', 'Quiz Completed');
    cy.get('.alert-success').should('contain', 'Your score: 2/2');

    // Start a new quiz
    cy.get('button').contains('Take New Quiz').click();
    cy.get('h2').should('contain', 'Test Question 1');
  });

  it('should handle incorrect answers', () => {
    cy.visit('/');
    
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Answer first question incorrectly
    cy.get('h2').should('contain', 'Test Question 1');
    cy.get('button').eq(1).click();

    // Answer second question incorrectly
    cy.get('h2').should('contain', 'Test Question 2');
    cy.get('button').eq(0).click();

    // Check final score
    cy.get('h2').should('contain', 'Quiz Completed');
    cy.get('.alert-success').should('contain', 'Your score: 0/2');
  });

  it('should show loading state while fetching questions', () => {
    cy.visit('/');
    
    // Start the quiz and immediately check for loading state
    cy.get('button').contains('Start Quiz').click();
    
    // The spinner should be visible immediately after clicking
    cy.get('.spinner-border', { timeout: 10000 }).should('be.visible');
    
    // Wait for the delayed response
    cy.wait('@getQuestions');
    
    // After loading, we should see the first question
    cy.get('h2').should('contain', 'Test Question 1');
  });
}); 