
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {QuizPage} from './pages/QuizPage';
import { Test } from './pages/test';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <Routes>
      <Route path='/test' element={<Test/>}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  );
}
