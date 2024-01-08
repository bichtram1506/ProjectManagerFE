import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBox, faClipboardList, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ onLogout }) => {
  const [activeNavItem, setActiveNavItem] = useState('');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <header className="admin-header">
      <nav className="admin-header__nav">
        <ul className="admin-header__nav-list">
          <li className={`admin-header__nav-item ${activeNavItem === 'dashboard' ? 'active' : ''}`}>
            <Link
              to="/home"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('dashboard')}
            >
              <FontAwesomeIcon icon={faChartBar} className="admin-header__nav-icon" /> Dashboard
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'departments' ? 'active' : ''}`}>
            <Link
              to="/departments"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('departments')}
            >
              <FontAwesomeIcon icon={faBox} className="admin-header__nav-icon" /> Quản lý khoa
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'users' ? 'active' : ''}`}>
            <Link
              to="/users"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('users')}
            >
              <FontAwesomeIcon icon={faClipboardList} className="admin-header__nav-icon" /> Quản lý người dùng
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'specializations' ? 'active' : ''}`}>
            <Link
              to="/specializations"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('specializations')}
            >
              <FontAwesomeIcon icon={faUsers} className="admin-header__nav-icon" /> Quản lý chuyên ngành
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'training_systems' ? 'active' : ''}`}>
            <Link
              to="/training_systems"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('training_systems')}
            >
              <FontAwesomeIcon icon={faUsers} className="admin-header__nav-icon" /> Quản lý Hệ đào tạo
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'academic_years' ? 'active' : ''}`}>
            <Link
              to="/academic_years"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('academic_years')}
            >
              <FontAwesomeIcon icon={faUsers} className="admin-header__nav-icon" /> Quản lý Niên khóa
            </Link>
          </li>
          <li className={`admin-header__nav-item ${activeNavItem === 'classes' ? 'active' : ''}`}>
            <Link
              to="/classes"
              className="admin-header__nav-link"
              onClick={() => handleNavItemClick('classes')}
            >
              <FontAwesomeIcon icon={faUsers} className="admin-header__nav-icon" /> Quản lý Lớp
            </Link>
          </li>
          
          <li className="admin-header__nav-item">
            <button onClick={onLogout} className="admin-header__logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} className="admin-header__nav-icon" /> Đăng xuất
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;