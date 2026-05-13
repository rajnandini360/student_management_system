import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleLogin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    email,
                    password
                }
            );

            // SAVE TOKEN
            // SAVE TOKEN + ROLE
localStorage.setItem("token", res.data.token);

localStorage.setItem("role", res.data.role);

            alert(res.data.message);

            // REDIRECT TO DASHBOARD
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Invalid Email or Password");

        }

    };


    return (

        <div className="flex justify-center items-center h-[80vh]">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                    Login
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Login;