
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {QuizPage} from './pages/QuizPage';
import { Test } from './pages/Test';
import { LoginPage } from './pages/users/LoginPage';
import { ProfilePage } from './pages/users/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EditProfilePage } from './pages/users/EditProfilePage';
import { RegisterPage } from './pages/users/RegisterPage';

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
        <Route
          path='/editar-perfil' 
          element={
            <ProtectedRoute>
            <EditProfilePage/>
            </ProtectedRoute>
          }/>

      <Route path='/registro' element={<RegisterPage/>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
  );  
}
