import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaProjectDiagram, FaTasks, FaDollarSign, FaBox } from 'react-icons/fa';
import { MdMenu, MdClose } from 'react-icons/md';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </button>
        {!isCollapsed && <h4 className="sidebar-title">Deskly</h4>}
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          {!isCollapsed && <span>Dashboard</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/clients" className="sidebar-link">
          <FaUsers className="sidebar-icon" />
          {!isCollapsed && <span>Clients</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/projects" className="sidebar-link">
          <FaProjectDiagram className="sidebar-icon" />
          {!isCollapsed && <span>Projects</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/tasks" className="sidebar-link">
          <FaTasks className="sidebar-icon" />
          {!isCollapsed && <span>Tasks</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/finances" className="sidebar-link">
          <FaDollarSign className="sidebar-icon" />
          {!isCollapsed && <span>Finances</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/resources" className="sidebar-link">
          <FaBox className="sidebar-icon" />
          {!isCollapsed && <span>Resources</span>}
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;