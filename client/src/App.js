import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes > 
      </BrowserRouter> 
    </div>
  );
}

export default App;
