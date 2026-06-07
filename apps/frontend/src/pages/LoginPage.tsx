
export default function LoginPage() {
    const api = import.meta.env.VITE_BACKEND_API_URL
    const handleLogin = () => {
        window.location.href = `${api}/auth/login`
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={handleLogin}
                className="px-6 py-3 rounded-lg bg-black text-white"
            >
                Sign in with Microsoft
            </button>
        </div>
    )
}
