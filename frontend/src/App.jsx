import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import EditUserPage from './pages/EditUserPage';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/dashboard' element={<UserDashboard />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/edit/:id' element={<EditUserPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
