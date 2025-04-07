import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesklyNavbar from './components/DesklyNavbar';
import LoginForm from './pages/Login';

function App() {
  return (
    <Router>
      <DesklyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;