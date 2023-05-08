import React, { useState, useEffect, useContext,useRef } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [scroll, setScroll] = useState(0);
  const outerDivRef = useRef(null);
  const { userId } = useContext(UserContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:8080/api/fetchData');
      const sortedUsers = response.data.sort((a, b) => b.score - a.score);
      setUsers(sortedUsers);
    };
    fetchUsers();
  }, []);

  // Find the current user in the leaderboard
  const currentUser = users.find(user => user._id === userId);
  
  const navigate = useNavigate();
  // Get the rank of the current user
  const currentUserRank = users.findIndex(user => user._id === userId) + 1;
  const logout =()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div ref={outerDivRef} className="outerdiv text-white min-h-screen p-14 pt-20 xl:p-16 ">
      {/* Display the current user's score and time */}
      {currentUser && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <h2 className="text-2xl font-bold mb-2">
            Your Score: {currentUser.score}
          </h2>
          <p className="text-lg font-semibold">
            Your Time: {currentUser.time}s
          </p>
          <p className="text-lg font-semibold">
            Your Rank: {currentUserRank}
          </p>
          <hr className="my-4" />
        </div>
      )}
      {/* Display the leaderboard */}
      <h2 className="text-3xl font-bold mb-8 flex justify-between">Leaderboard <span className=' cursor-pointer hover:text-slate-500' onClick={logout}>Logout</span> </h2>
      <div className="overflow-x-auto">
        <table className="table-auto capitalize w-full text-black border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${user._id === userId ? 'bg-green-700' : ''} ${index===0 ? 'bg-[rgb(255,215,0)]': index===1 ? 'bg-[rgb(192,192,192)]' : index===2 ?'bg-[#967444] ': 'bg-inherit' }`}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="border px-4 py-2">{user.time}s</td>
                <td className="border px-4 py-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
