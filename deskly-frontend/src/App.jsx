import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesklyNavbar from './components/DesklyNavbar';
import LoginForm from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <DesklyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;