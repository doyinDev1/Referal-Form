import './App.css';
import LoginForm from './components/LoginForm';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationSuccess from './pages/RegistrationSuccess';
import toast , {Toaster } from 'react-hot-toast'
import Refer from './pages/Refer/Refer'
import ChatwootWidget from './components/ChatwootWidget/ChatwootWidget'
function App() {
  return (
    <div className="app">

      
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/success" element={<RegistrationSuccess />} />
        <Route exact path="/refer" element={<Refer />} />

      </Routes>
      <div><Toaster/></div>
      <ChatwootWidget/>
    </div>
  );
}

export default App;
