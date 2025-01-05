// components/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader'; // Ensure this path is correct

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
