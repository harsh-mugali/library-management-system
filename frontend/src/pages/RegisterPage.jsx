import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import registerBg from "../assets/register.png";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await axios.post("http://127.0.0.1:5000/register", {
                name,
                email,
                password,
                role: "user"
            });

            toast.success("Registration successful!");

            setTimeout(() => {
                window.location.href = "/";
            }, 1500);

        } catch (error) {

            toast.error("Registration failed");

        }

    };

    return (

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: `url(${registerBg})` }}
            ></div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>


            {/* MAIN CARD */}
            <div className="relative flex w-[1100px] h-[600px] rounded-2xl overflow-hidden
  backdrop-blur-2xl bg-white/10 border border-white/20
  shadow-[0_0_60px_rgba(0,0,0,0.8)]">

                {/* LEFT FORM */}
                <div className="flex flex-col justify-center w-1/2 px-16 text-white">

                    <h2 className="text-4xl font-bold mb-8 text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleRegister}>

                        <input
                            placeholder="Full Name"
                            className="w-full p-4 mb-5 rounded-lg
          bg-white/10 border border-white/30
          placeholder-gray-300 focus:outline-none focus:border-teal-400"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            placeholder="Email"
                            className="w-full p-4 mb-5 rounded-lg
          bg-white/10 border border-white/30
          placeholder-gray-300 focus:outline-none focus:border-teal-400"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 mb-6 rounded-lg
          bg-white/10 border border-white/30
          placeholder-gray-300 focus:outline-none focus:border-teal-400"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="w-full py-3 rounded-lg
          bg-gradient-to-r from-green-400 to-emerald-500
          hover:scale-[1.03] transition-all duration-300"
                        >
                            REGISTER
                        </button>

                    </form>

                    <p className="text-center mt-6 text-gray-200">
                        Already have an account?
                        <a href="/" className="text-teal-400 ml-1 hover:underline">
                            Login
                        </a>
                    </p>

                </div>


                {/* RIGHT IMAGE */}
                <div className="w-1/2">
                    <img
                        src={registerBg}
                        alt="register"
                        className="h-full w-full object-cover"
                    />
                </div>

            </div>

        </div>

    );
}

export default RegisterPage;