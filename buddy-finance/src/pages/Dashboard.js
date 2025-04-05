import React from 'react';

const Dashboard = ({ setCurrentPage }) =>  {
  console.log("setCurrentPage:", setCurrentPage);
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>You have successfully logged in.</p>
    </div>
  );
};

export default Dashboard;