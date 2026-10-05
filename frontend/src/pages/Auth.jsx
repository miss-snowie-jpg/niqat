import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("isLogin") === "true";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      !username ||
      !password ||
      (!isLogin && (!email || !confirmPassword || !phone))
    ) {
      return alert("Please fill in all required fields.");
    }
    if (!isLogin && password !== confirmPassword) {
      return alert("Passwords do not match.");
    }
    try {
      const { data } = await axios.post(
        isLogin ? "/api/auth/login" : "/api/auth/register",
        {
          username,
          password,
          email,
          phone,
        },
      );
      localStorage.setItem("user", data.user);
      navigate("/dashboard");
    } catch (e) {
      console.error("Caught it: " + e)
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full min-h-150 max-w-125 bg-bg-dark rounded-3xl p-10 glow-border flex flex-col gap-10">
        <nav className="flex items-center justify-between">
          <h1 className="text-4xl bg-linear-to-r from-accent-dark via-accent-light to-accent-dark bg-clip-text text-transparent inline-block">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <button
            className="bg-white/10 backdrop-blur-2xl border-white/30 border border-solid rounded-md w-12 h-12 text-lg font-bold pointer hover:bg-white/20 transition-all hover:-translate-y-0.5"
            onClick={() => navigate(-1)}
          >
            {"<"}
          </button>
        </nav>
        <div className="flex-1 flex p-5 justify-center flex-col gap-5">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/30 w-full relative rounded-2xl">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-[inherit] px-12.5 py-4 outline-none focus:border-accent focus:shadow-[0_0_30px_var(--color-accent)] transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur-2xl border border-white/30 w-full relative rounded-2xl">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-[inherit] px-12.5 py-4 outline-none focus:border-accent focus:shadow-[0_0_30px_var(--color-accent)] transition-all"
            />
          </div>
          {!isLogin && (
            <>
              <div className="bg-white/10 backdrop-blur-2xl border border-white/30 w-full relative rounded-2xl">
                <input
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full rounded-[inherit] px-12.5 py-4 outline-none focus:border-accent focus:shadow-[0_0_30px_var(--color-accent)] transition-all"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-2xl border border-white/30 w-full relative rounded-2xl">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full rounded-[inherit] px-12.5 py-4 outline-none focus:border-accent focus:shadow-[0_0_30px_var(--color-accent)] transition-all"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-2xl border border-white/30 w-full relative rounded-2xl">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-[inherit] px-12.5 py-4 outline-none focus:border-accent focus:shadow-[0_0_30px_var(--color-accent)] transition-all"
                />
              </div>
            </>
          )}
        </div>
        <button className="bg-white/10 backdrop-blur-2xl border-white/30 border border-solid rounded-md py-3 text-sm font-bold pointer hover:bg-white/20 transition-all hover:-translate-y-0.5 shine" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
