// components/DashboardHeader.js
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="container">
      <Link className="logo" to="/dashboard">
          {/* <img src='/images/logoc.png' alt="Logo" className="logo-img" /> */}
          Dashboard
        </Link>
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/dashboard/quizzes">Quizzes</Link></li>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><Link to="/dashboard/leaderboard">Leaderboard</Link></li>
            <li><Link to="/dashboard/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
