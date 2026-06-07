
export default function LoginPage() {
    const api = import.meta.env.VITE_BACKEND_API_URL
    const handleLogin = () => {
        window.location.href = `${api}/auth/login`
    }
    return (
        <>
            <div className="LoginScreen min-h-screen w-full bg-purple-950">
                <div className="flex flex-col md:flex-row min-h-screen w-full m-0 p-0">
                    {/* Banner Image Column */}
                    <div className="w-full md:w-1/2 p-0">
                        <div className="bannerImage h-64 md:h-full w-full bg-[url('/leftbannerimg.png')] bg-cover bg-center"></div>
                    </div>

                    {/* Login Form Column */}
                    <div className="divLoginContainer w-full md:w-1/2 flex justify-center items-center p-6">
                        <div className="backdrop-blur-[3.15px] bg-[#999999]/17 border border-[rgba(233,233,233,0.28)] rounded-[17.618px] px-20.75 py-20 text-center text-[#fff]">
                            <p className="singIn text-2xl font-bold mb-8">Sign In</p>
                            <img
                                onClick={handleLogin}
                                src="/microsoft-icon.svg"
                                alt="microsoft SSO"
                                className="microsoftSSO cursor-pointer hover:opacity-80 transition-opacity"
                                role="button"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
