/* src/App.jsx */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import DesklyNavbar from './components/DesklyNavbar';
import Sidebar from './components/Sidebar';
import LoginForm from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks'; 

function Projects() {
  return <div className="main-content"><h2>Projects</h2><p>Manage your projects here.</p></div>;
}

function Finances() {
  return <div className="main-content"><h2>Finances</h2><p>Manage your finances here.</p></div>;
}

function Resources() {
  return <div className="main-content"><h2>Resources</h2><p>Manage your resources here.</p></div>;
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <DesklyNavbar />
      {isAuthenticated ? (
        <div className="d-flex">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;