import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ChatPage from '../pages/ChatPage';
import AuthSuccessPage from '../pages/AuthSuccessPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route
                path="/auth/success"
                element={<AuthSuccessPage />}
            />
        </Routes>
    );
}