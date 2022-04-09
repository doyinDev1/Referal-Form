import './App.css';
import LoginForm from './components/LoginForm';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationSuccess from './pages/RegistrationSuccess';
import toast , {Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="app">

      
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="success" element={<RegistrationSuccess />} />
      </Routes>
      <div><Toaster/></div>
    </div>
  );
}

export default App;
