
import React, { useState, useRef ,useContext} from 'react'
import { data } from "../constants";
import axios from 'axios';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [hintVisible, setHintVisible] = useState(false)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const questions = data;
  const navigate = useNavigate();


  const timerRef = useRef(null)
  const { userId } = useContext(UserContext);

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNextQuestion = () => {
    const question = questions[currentQuestion]
    if (selectedOption === question.answer) {
      setScore(score + 2)
    } 
    if (hintVisible) {
      setScore(score - 0.5)
    } 
    if(selectedOption != question.answer){
      setScore(score - 1)
    }
    setCurrentQuestion(currentQuestion + 1)
    setSelectedOption(null)
    setHintVisible(false)
  }

  const handleHintClick = () => {
    setHintVisible(!hintVisible)
    if (!hintVisible) {
      setScore(score - 0.5)
    }
  }

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date().getTime())
  }

  const handleSubmitQuiz=async ()=>{
    clearInterval(timerRef.current)
    timerRef.current = null
    const endTime = new Date().getTime()
    const timeTaken = (endTime - startTime) / 1000
    console.log(`Time taken: ${timeTaken} seconds`)
    console.log(`Score: ${score}`)
    try {
        const response = await axios.put(`http://localhost:8080/api/update/${userId}`, {
          score: score,
          time: timeTaken,
        });
        console.log(response.data);
        navigate('/leaderboard');
      } catch (error) {
        console.error(error);
      }
  }
  
  if (!quizStarted) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='text-white bg-black-gradient-2 p-3 text-bold text-5xl'>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
      
    )
  }


  return (
    <div className='text-white px-8'>

{/* heading */}
      <div className=' border border-red-500 flex justify-between flex1 my-5'>
        {currentQuestion >= 0 && (
          <button onClick={handleHintClick}>{hintVisible ? questions[currentQuestion].hint : 'Hint'}</button>
        )}
        <h1>Score: {score}</h1>
      </div>

{/* content */}
      <div className='flex flex-col'>
        
        <div className='min-w-[80%] border border-blue-300 px-[10%] mb-5'>
          <h1 className='text-bold text-4xl'>{`Question ${currentQuestion + 1}-`}</h1>
          <p className='text-2xl my-5'>{questions[currentQuestion].question}</p>
        </div>


        <div className='flex justify-between flex-wrap border  px-[10%] border-green-800'>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`${
                selectedOption === option ? 'bg-gray-600' : 'bg-gray-400'
              } py-2 px-8 rounded text-lg font-bold w-[40%] m-2`}
            >
              {option}
            </button>
          ))}
        </div>


        {selectedOption && currentQuestion+1 < questions.length && (
          <button className='my-5' onClick={handleNextQuestion}>
            Next question
          </button>
        )}
        {currentQuestion + 1 === questions.length && (
  <button className='my-5' onClick={handleSubmitQuiz}>
    Submit Quiz
  </button>
        )}
      </div>
    </div>
  )
}

export default Quiz;



