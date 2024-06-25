import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Boards from './component/Boards';
import Users from './component/Users';
import Projects from './component/Projects';
import Allocation from './component/Allocation';
import Progress from './component/Progress';
import Meeting from './component/Meeting';


const RouterPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />     
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/users" element={<Users />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/meeting" element={<Meeting />} />
        
        
      </Routes>
    </Router>
  );
};

export default RouterPage;
