import React from 'react';
import Quiz from '../../src/components/Quiz';
import { mount } from 'cypress/react18';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mock the API call
    cy.intercept('GET', '/api/questions/random', {
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
        }
      ]
    }).as('getQuestions');
  });

  it('should render the start button initially', () => {
    mount(<Quiz />);
    cy.get('button').should('contain', 'Start Quiz');
  });

  it('should start the quiz when start button is clicked', () => {
    mount(<Quiz />);
    cy.get('button').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('contain', 'Test Question 1');
  });

  it('should show loading state while fetching questions', () => {
    mount(<Quiz />);
    cy.get('button').click();
    cy.get('.spinner-border').should('be.visible');
  });

  it('should show quiz completion screen with score', () => {
    mount(<Quiz />);
    cy.get('button').click();
    cy.wait('@getQuestions');
    cy.get('button').first().click(); // Click the correct answer
    cy.get('h2').should('contain', 'Quiz Completed');
    cy.get('.alert-success').should('contain', 'Your score: 1/1');
  });

  it('should allow starting a new quiz after completion', () => {
    mount(<Quiz />);
    cy.get('button').click();
    cy.wait('@getQuestions');
    cy.get('button').first().click(); // Click the correct answer
    cy.get('button').contains('Take New Quiz').click();
    cy.get('h2').should('contain', 'Test Question 1');
  });
});

