import React from 'react';

function QuestionAndChoices({ question }) {
  return (
    <div>
      <h3>Question:</h3>
      <p>{question.question.question_text}</p>
      <h3>Choices:</h3>
      <ul>
        {question.map(choice => (
          <li key={choice.id}>
            {choice.choice_text} - Votes: {choice.votes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionAndChoices;
