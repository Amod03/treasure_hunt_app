
import React, { useState, useRef ,useContext,useEffect} from 'react'
import { data } from "../constants";
import axios from 'axios';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Quiz() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hintVisible, setHintVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [timeTakenPerQuestion, setTimeTakenPerQuestion] = useState([]);
    const [questionStartTime, setQuestionStartTime] = useState(null);
    const [questionTimeTaken, setQuestionTimeTaken] = useState(null);

    const questions = data;
    const { userId } = useContext(UserContext);
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
      setHintVisible(false);
      const user = JSON.parse(localStorage.getItem('user_id'));
      const newID=user.userId;
      console.log(newID);
      const quiz=JSON.parse(localStorage.getItem(`quiz_${newID}`))
      console.log(quiz);
      if(!quiz)
      {
        const quizData = {
          currentQuestion,
          selectedOption,
          hintVisible,
          score,
          timeTakenPerQuestion,
          quizStarted,
          startTime,
        
        };
        try {
          localStorage.setItem(`quiz_${user.userId}`, JSON.stringify(quizData));
        } catch (error) {
          console.error('Unable to store quiz data in local storage:', error);
        }
      }
      else{
        if(currentQuestion===10)
        {
          navigate(`/${newID}/story`, {
            state: {
              userId: userId,
              score: score,
          
            }
          });
          return;
        }
      setCurrentQuestion(quiz.currentQuestion);
      setSelectedOption(quiz.selectedOption);
      setScore(quiz.score);
      setTimeTakenPerQuestion(quiz.timeTakenPerQuestion);
      setQuestionStartTime(quiz.questionStartTime);
      setQuestionTimeTaken(quiz.questionTimeTaken);
      setQuizStarted(quiz.quizStarted);
      }
        
        
      }, []);
  const timerRef = useRef(null);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleNextQuestion = () => {
    // Calculate the time taken for the current question
    const user = JSON.parse(localStorage.getItem('user_id'));
    const newID=user.userId;
    const questionStartTime = timeTakenPerQuestion[currentQuestion] || startTime;
    const questionEndTime = new Date().getTime();
    const questionTimeTaken = (questionEndTime - questionStartTime) / 1000;
  
    // Add the time taken for the current question to the timeTakenPerQuestion array
    const updatedTimeTakenPerQuestion = [...timeTakenPerQuestion.slice(0, currentQuestion), questionTimeTaken, ...timeTakenPerQuestion.slice(currentQuestion + 1)];
    setTimeTakenPerQuestion(updatedTimeTakenPerQuestion);
     let sco=score;
    const question = questions[currentQuestion];
    if (selectedOption === question.answer) {
       sco=sco+2;
    }
    if (selectedOption !== question.answer) {
      sco=sco-1;
    }
    const updateQuizData = {
      currentQuestion:currentQuestion+1,
      selectedOption,
      hintVisible,
      score:sco,
      timeTakenPerQuestion:updatedTimeTakenPerQuestion,
      quizStarted,
      startTime,
    };
    setScore(sco);
    try {
      localStorage.setItem(`quiz_${newID}`, JSON.stringify(updateQuizData));
    } catch (error) {
      console.error('Unable to store quiz data in local storage:', error);
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
   setHintVisible(false);
    setQuestionStartTime(null);
    setQuestionTimeTaken(null);
  };
  
  const handleHintClick = () => {
    setHintVisible((prev)=>!prev);
    if (!hintVisible) {
      setScore(score - 0.5);
    }
  };
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date().getTime());
    const quizState = JSON.parse(localStorage.getItem(`quiz_${userId}`));
  
    if (quizState) {
      setCurrentQuestion(quizState.currentQuestion);
      setSelectedOption(quizState.selectedOption);
      setHintVisible(quizState.hintVisible);
      setScore(quizState.score);
      setTimeTakenPerQuestion(quizState.timeTakenPerQuestion);
      setQuestionStartTime(quizState.questionStartTime);
      setQuestionTimeTaken(quizState.questionTimeTaken);
    }
  };

  const handleSubmitQuiz = async () => {
    const user = JSON.parse(localStorage.getItem('user_id'));
      const newID=user.userId;
    clearInterval(timerRef.current);
    timerRef.current = null;
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
  
    const timeTakenPerQuestionArray = [parseFloat(timeTakenPerQuestion[0].toFixed(3))];
    for (let i = 1; i < timeTakenPerQuestion.length; i++) {
      const timeDiff = timeTakenPerQuestion[i] - timeTakenPerQuestion[i - 1];
      const formattedTimeDiff = parseFloat(timeDiff.toFixed(3));
    timeTakenPerQuestionArray.push(formattedTimeDiff);
  }
  if (score >= 1) {

    navigate(`/${newID}/story`, {
      state: {
        userId: newID,
        score: score,
        time: timeTaken,
        timePerQuestion: timeTakenPerQuestionArray,
        storyReached: "Yes"
      }
    });
  } else {
    try {
      const response = await axios.put(`http://localhost:8080/api/update/${newID}`, {
        score: score,
        time: timeTaken,
        timePerQuestion: timeTakenPerQuestionArray,
        storyReached: false
      });
      navigate('/leaderboard');
    } catch (error) {
      console.error(error);
    }
  }
};

  if (!quizStarted) {
    return (
        <div className="outerdiv h-screen  bg-slate-500">
				<div className="flex flex-col h-[100%] items-center">
					<div className=" flex flex-col  text-white mt-20 items-center">
						<h2 className="text-4xl font-poppins font-bold my-8 sm:my-5">Instructions for game</h2>
						<div className=" mt-5 text-md sm:text-lg font-normal my-4 leading-5 sm:leading-10 text-center max-w-xl mx-auto ">
							<ul className=' text-left md:m-0 my-5 '>
                 <li className='my-5 mx-4 md:m-0'>Click on "Start Quiz" button to begin the quiz.</li>
                 <li className='my-5 mx-4 md:m-0'>Multiple-choice questions will be presented one at a time.</li>
                 <li className='my-5 mx-4 md:m-0'>Choose an answer and click "Next" to proceed to the next question.</li>
                 <li className='my-5 mx-4 md:m-0'>You can change your answer before clicking "Next".</li>
                 <li className='my-5 mx-4 md:m-0'>Use the "Hint" button if you're stuck on a question (hint comes at a score penalty).</li>
                 <li className='my-5 mx-4 md:m-0'>Once all questions are answered, your final score will be displayed.</li>
                 <li className='my-5 mx-4 md:m-0'>If you are able to score more than 10 marks,you will be intitled to play treasure hunt story</li>
              </ul>
						</div>
					</div>
					<div >
						<button onClick={handleStartQuiz} className="p-4  rounded-xl px-5 text-slate-600 bg-slate-100 hover:bg-slate-600 hover:text-white">
							Start Quiz
						</button>
					</div>
				</div>
			</div>
    )
  }

  return (
    <div className='outerdiv border border-slate-700 h-screen  w-[100%]'>
    <div className='mt-20 text-black h-[800px] max-w-[970px] mx-auto flex flex-col'>

{/* heading */}
      <div className='flex justify-between text-white'>
        {currentQuestion >= 0 && (
          <button className="p-2 ml-9 font-poppins uppercase font-semibold hover:text-gray-300 " onClick={handleHintClick}>{hintVisible ? questions[currentQuestion].hint : 'Hint'}</button>
        )}
        <h1 className="p-2 font-poppins  font-semibold hover:text-gray-300 ">Score: {score}</h1>
      </div>

{/* content */}
      <div >
        
        <div className='text-white flex flex-col px-10'>
          <h1 className="text-3xl md:text-4xl leading-10 font-bold font-poppins ">{`Question ${currentQuestion + 1}-`}</h1>
          <p className="text-2xl md:text-4xl leading-6 font-semibold my-5">{questions[currentQuestion].question}</p>
        </div>


        <div className="h-[400px]  flex flex-col sm:flex-row sm:justify-center md:justify-evenly sm:flex-wrap justify-between items-center">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`text-3xl border border-white  capitalize w-[70%] sm:w-[400px] mx-2 my-4 px-10 py-5 rounded-full duration-700 hover:bg-gray-100 hover:text-slate-600 ${selectedOption===option ?"bg-slate-100 text-slate-600":"text-white"}`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-center md:mt-4 lg:mt-0 mt-10">
        {selectedOption && currentQuestion+1 < questions.length && (
          <button className="text-3xl px-12 text-white hover:text-black font-semibold hover:bg-yellow-300 p-4 rounded-full duration-700" onClick={handleNextQuestion}>
            Next 
          </button>
        )}
        {currentQuestion + 1 === questions.length && (
  <button className='text-3xl text-white  hover:text-black font-semibold hover:bg-yellow-300 p-4 rounded-full duration-700' onClick={handleSubmitQuiz}>
    Submit Quiz
  </button>
        )}
      </div>
      </div>
    </div>
    </div>
  )
}

export default Quiz;



