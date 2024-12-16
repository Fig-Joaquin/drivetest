
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {QuizPage} from './pages/QuizPage';
import { Test } from './pages/test';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path='/test' element={<Test/>}/>
    </Routes>
  );
}
