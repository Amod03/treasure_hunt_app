import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const { userId } = useContext(UserContext);
  console.log('userId:', userId);
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
  console.log('currentUser:', currentUser);
  console.log('fetched users:', users);

  // Get the rank of the current user
  const currentUserRank = users.findIndex(user => user._id === userId) + 1;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
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
      <h2 className="text-3xl font-bold mb-8">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={user._id === userId ? 'bg-gray-700' : ''}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
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
