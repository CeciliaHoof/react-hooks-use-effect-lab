import React, { useState, useEffect} from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    let isMounted;
    let countDown;
    question ? isMounted = true : isMounted = false;
    if (isMounted){
      if(timeRemaining > 0){countDown = setTimeout(() =>
        {setTimeRemaining(timeRemaining -1)
      }, 1000);}
      else if(timeRemaining === 0){
        setTimeRemaining(10);
        onAnswered(false)
      }
    }
    
    return function cleanup() {
      clearTimeout(countDown);
    }
    
  }, [timeRemaining, onAnswered])



  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
