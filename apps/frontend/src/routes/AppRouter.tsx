import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ChatPage from '../pages/ChatPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
        </Routes>
    );
}