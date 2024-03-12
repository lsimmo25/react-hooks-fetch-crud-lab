import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem.js";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleChangeAnswer(questionId, newCorrectIndex) {
    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (question.id === questionId) {
          return {...question, correctIndex: newCorrectIndex }
        }
        return question
      })
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;