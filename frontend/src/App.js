import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './assets/css/index.css';
import AcademicYearList from './components/academic_year/AcademicYearList';
import DepartmentList from './components/department/DepartmentList';
import Home from './components/home/Home';
import Header from './components/layout/Header';
import SpecializationList from './components/specialization/Specialization';
import TrainingSystemList from './components/training_system/TrainingSystemList';
import ClassList from './components/class/classList';
import UserList from './components/user/UserList';
import Login from './components/auth/Login';

const App = () => {
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
      <h1 style={{ textAlign: 'center' }}>Quản lý đồ án tốt nghiệp</h1>
              {isLoggedIn && <Header onLogout={handleLogout} />}
        <Routes>
          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/specializations" element={<SpecializationList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/training_systems" element={<TrainingSystemList />} />
              <Route path="/academic_years" element={<AcademicYearList />} />
              <Route path="/classes" element={<ClassList />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}

          {/* Login Route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;