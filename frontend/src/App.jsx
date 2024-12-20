
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {QuizPage} from './pages/QuizPage';
import { Test } from './pages/Test';
import { LoginPage } from './pages/users/LoginPage';
import { ProfilePage } from './pages/users/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      <Route path='/test' element={<Test/>}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route 
        path='/perfil' 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        
        }/>
    </Routes>
  );  
}
