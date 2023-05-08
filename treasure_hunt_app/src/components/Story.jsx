import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Story() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId,score,time,timePerQuestion,storyReached } = location.state || {};
  
  const user = JSON.parse(localStorage.getItem('user_id'));
      const newID=user.userId;
  console.log(userId);
  const [wordInputs, setWordInputs] = useState({
    ecstatic: "",
    safe: "",
    ordinary: "",
    inferior: "",
    fatigued: "",
    effective: "",
    articulate: "",
    modest: "",
    thoughtful: "",
    clear: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWordInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correctOrder = [
      wordInputs.ecstatic,
      wordInputs.safe,
      wordInputs.inferior,
      wordInputs.fatigued,
      wordInputs.effective,
      wordInputs.articulate,
      wordInputs.modest,
      wordInputs.thoughtful,
      wordInputs.clear,
    ];
    const correctWords = [
      "ecstatic",
      "safe",
      "inferior",
      "fatigued",
      "effective",
      "articulate",
      "modest",
      "thoughtful",
      "clear",
    ];
    const isCorrect =
      JSON.stringify(correctOrder) === JSON.stringify(correctWords);
      const scoreIncrement = isCorrect ? 10 : 5;
      const newScore = score + scoreIncrement;

    try {
      console.log(userId)
        const response = await axios.put(`http://localhost:8080/api/update/${newID}`, {
          score: newScore,
          time: time,
          timePerQuestion:timePerQuestion,
          storyReached:storyReached
        });
    
        navigate('/leaderboard');
      } catch (error) {
        alert(error);
      }
  };

  return (
    <div className="outerdiv h-[100%] w-full pt-20 font-poppins" >
      
      <div className="text-white text-lg  flex flex-col  w-[80%] max-w-[1019px] mx-auto">
        <h1 className="text-3xl mb-5  ">Welcome to story mode</h1>
        <h2 className="text-xl font-poppins leading-8"> Complete the story with the words which were answer of quiz- <br className="md:hidden block"/>
        ecstatic , safe ,ordinary, inferior, fatigued, effective, articulate, modest, thoughtful, clear
        </h2>
      </div>
      <div  className="text-white mt-7   text-md  flex flex-col  w-[80%] max-w-[1019px] mx-auto">
      <form onSubmit={handleSubmit}>
    <p className="mb-4">
      There once was an adventurous explorer named Jack who had been
      searching for treasure all his life. He had explored every corner of
      the world, but had never found anything that truly made him{" "}
      <input
        className="text-black nayadabba"
        type="text"
        name="ecstatic"
        value={wordInputs.ecstatic}
        onChange={handleInputChange}
      />
      . One day, he received a map that was said to lead to the most{" "}
      <input
        className="text-black bg-white nayadabba px-2 py-1 rounded-sm mt-2"
        type="text"
        name="effective"
        value={wordInputs.effective}
        onChange={handleInputChange}
      />{" "}
      treasure of all time. Jack set off on his journey with excitement and
      anticipation, but soon realized that this adventure was not going to
      be{" "}
      <input
        className="text-black bg-white px-2 py-1 nayadabba rounded-sm mt-2"
        type="text"
        name="safe"
        value={wordInputs.safe}
        onChange={handleInputChange}
      />
      . He had to cross treacherous rivers and climb mountains that made him
      feel{" "}
      <input
        className="text-black nayadabba bg-white px-2 py-1 rounded-sm mt-2"
        type="text"
        name="fatigued"
        value={wordInputs.fatigued}
        onChange={handleInputChange}
      />
      . However, he was determined to find the treasure and would not let
      anything stand in his way. As he journeyed deeper into the jungle, he
      stumbled upon a tribe of{" "}
      <input
      className="text-black nayadabba  bg-white px-2 py-1 rounded-sm mt-2"
        type="text"
        name="inferior"
        value={wordInputs.inferior}
        onChange={handleInputChange}
      />{" "}
      warriors who had been guarding the treasure for centuries. They did
      not take kindly to his presence and attacked him with their sharp
      spears. Jack fought them off with his trusty sword and showed them
      that he was not to be underestimated. After days of fighting and
      exploring, Jack finally found the treasure. It was more{" "}
      <input
      className="text-black nayadabba  bg-white px-2 py-1 rounded-sm mt-2 mb-2"
        type="text"
        name="thoughtful"
        value={wordInputs.thoughtful}
        onChange={handleInputChange}
      />{" "}
      than he could have ever imagined. He was filled with happiness
      and his heart was racing with excitement. He knew that he had finally
      found what he had been looking for all his life. As he made his way
      back home, he reflected on his journey and realized that it was not
      just the treasure that made him{" "}
      <input
      className="text-black bg-white nayadabba px-2 py-1 rounded-sm mt-2"
        type="text"
        name="clear"
        value={wordInputs.clear}
        onChange={handleInputChange}
      />{" "}
      about his purpose in life. It was the adventure itself, the challenges
      he had faced, and the lessons he had learned along the way. Jack
      returned home a changed man, more{" "}
      <input
      className="text-black bg-white px-2 nayadabba py-1 rounded-sm mt-2"
        type="text"
        name="articulate"
        value={wordInputs.articulate}
        onChange={handleInputChange}
      />{" "}
      and{" "}
      <input
      className="text-black nayadabba bg-white px-2 py-1 rounded-sm mt-2 mb-2"
        type="text"
        name="modest"
        value={wordInputs.modest}
        onChange={handleInputChange}
      />{" "}
      than ever before. He shared his story with anyone who would listen,
      inspiring them to pursue their own dreams and embark on their own
      adventures.
      <br/>
      <span className="text-red-700 font-semibold text-lg leading-10">***All options may not be used.</span>
    </p>
    <div className="text-center">

    <button type="submit" className="text-3xl my-8 w-[140px] hover:bg-white hover:text-slate-700 rounded-xl border p-4 ">Submit</button>
    </div>
  </form>
      </div>
    </div>
  );
}

export default Story;
