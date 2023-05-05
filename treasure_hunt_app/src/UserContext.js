// UserContext.js
import React from 'react';

const UserContext = React.createContext({
  userId: null,
  setUserId: () => {},
});

export default UserContext;
