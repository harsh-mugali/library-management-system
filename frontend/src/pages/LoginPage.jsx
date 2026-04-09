import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import loginBg from "../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("http://127.0.0.1:5000/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("userName", res.data.user.name);
            localStorage.setItem("userEmail", res.data.user.email);

            toast.success("Login successful!");

            setTimeout(() => {
                if (res.data.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/user";
                }
            }, 1500);

        } catch (error) {

            toast.error("Invalid login credentials");

        }
    };

    return (

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: `url(${loginBg})` }}
            ></div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>


            {/* MAIN CARD */}
            <div className="relative flex w-[1100px] h-[600px] rounded-2xl overflow-hidden
  backdrop-blur-2xl bg-white/10 border border-white/20
  shadow-[0_0_60px_rgba(0,0,0,0.8)]">

                {/* LEFT IMAGE */}
                <div className="w-1/2">
                    <img
                        src={loginBg}
                        className="h-full w-full object-cover"
                        alt="library"
                    />
                </div>


                {/* RIGHT FORM */}
                <div className="flex flex-col justify-center w-1/2 px-16 text-white">

                    <h2 className="text-4xl font-bold mb-8 text-center">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 mb-5 rounded-lg bg-white/10 border border-white/30
                          placeholder-gray-300 focus:outline-none focus:border-teal-400"
                        />

                        <div className="relative mb-6">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 rounded-lg bg-white/10 border border-white/30
                                placeholder-gray-300 focus:outline-none focus:border-teal-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                        <button
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500
                            hover:scale-[1.03] transition-all duration-300"
                        >
                            LOGIN
                        </button>

                    </form>

                    <p className="text-center mt-6 text-gray-200">
                        Don't have an account?
                        <a href="/register" className="text-teal-400 ml-1 hover:underline">
                            Register
                        </a>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default LoginPage;