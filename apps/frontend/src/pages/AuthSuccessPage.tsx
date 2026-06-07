import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const token = params.get("token");

    if (token) {
      localStorage.setItem(
        "token",
        token,
      );

      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      Logging in...
    </div>
  );
}