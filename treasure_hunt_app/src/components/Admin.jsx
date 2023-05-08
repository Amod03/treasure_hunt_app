
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fetchData');
        const sortedUsers = response.data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const hideUserDetails = () => {
    setShowDetails(false);
  };

  const renderTableData = () => {
    return users.map(({ _id, firstName, lastName, score, time, timePerQuestion}, index) => {
      const accuracy = ((score / 30) * 100).toFixed(2);
      return (
        <tr key={_id}>
          <td className="border-2 px-4 py-2">{index + 1}</td>
          <td className="border-2 px-4 py-2">{firstName} {lastName}</td>
          <td className="border-2 px-4 py-2">{score}</td>
          <td className="border-2 px-4 py-2">{accuracy}%</td>
          <td className="border-2 px-4 py-2">{time}</td>
          <td className="border-2 px-4 py-2 text-center">
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => showUserDetails({ _id, firstName, lastName, score, time, timePerQuestion, accuracy })}>
              More Details
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderUserDetails = () => {
    return (
      <div className='text-white w-[80%]  mx-auto h-screen  '>
        <h2 className='text-2xl font-bold mb-2 '>Details- <br/> {selectedUser.firstName} {selectedUser.lastName}</h2>
        <p className='mb-2 font-semibold'>Score: {selectedUser.score}</p>
        <p className='mb-2 font-semibold '>Time: {selectedUser.time}</p>
        <p className='mb-2 font-semibold'>Accuracy: {selectedUser.accuracy}%</p>
        <h3 className='font-bold mb-2'>Time Per Question:</h3>
        <table className='table-auto mb-2 text-sm lg:hidden w-[80%] '>
          <thead>
            <tr>
              <th className='px-4 py-2'>Question</th>
              <th className='px-4 py-2'>Time</th>
            </tr>
          </thead>
          <tbody>
            {selectedUser.timePerQuestion.map((time, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>Question {index + 1}</td>
                <td className='border px-4 py-2'>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className='table-auto mb-2 hidden lg:block'>
  <thead>
    <tr>
      <th className='px-4 py-2'>Question 1</th>
      <th className='px-4 py-2'>Question 2</th>
      <th className='px-4 py-2'>Question 3</th>
      <th className='px-4 py-2'>Question 4</th>
      <th className='px-4 py-2'>Question 5</th>
      <th className='px-4 py-2'>Question 6</th>
      <th className='px-4 py-2'>Question 7</th>
      <th className='px-4 py-2'>Question 8</th>
      <th className='px-4 py-2'>Question 9</th>
      <th className='px-4 py-2'>Question 10</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      {selectedUser.timePerQuestion.map((time, index) => (
        <td key={index} className='border px-4 py-2'>{time}</td>
      ))}
    </tr>
  </tbody>
</table>

       
        <button className='bg-gray-700 hover:bg-gray-100 hover:text-slate-700 text-white font-bold py-2 px-4 rounded mt-5' onClick={hideUserDetails}>Back to Leaderboard</button>
      </div>
    );
  };
  
  return (
    <div className='text-white outerdiv  pt-20 sm:h-[100%] h-[250vh] xs:h-[200vh] sm:w-[100%] w-[800px]'>
     {showDetails ? (
         renderUserDetails()
       ) : (
         <div className='max-w-[80%] overflow-x-auto opacity-80 relative mx-auto z-100'>
           <h1 className='text-5xl font-bold mb-2'>Admin Portal</h1>
           <table className='table-auto capitalize w-full text-white '>
             <thead>
               <tr>
               <th className="px-4 py-2">No.</th>
                 <th>Name</th>
                 <th>Score</th>
                 <th>Accuracy</th>
                 <th>Time</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>{renderTableData()}</tbody>
           </table>
         </div>
       )}
     </div>
   );
 }

 export default Admin;
