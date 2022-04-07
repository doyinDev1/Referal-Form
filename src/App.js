import './App.css';
import LoginForm from './components/LoginForm';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="success" element={<RegistrationSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
