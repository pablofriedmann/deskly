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
import Projects from './pages/Projects';
import Finances from './pages/Finances';
import Resources from './pages/Resources'; 

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