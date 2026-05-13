import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const handleRegister = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/auth/register",
                {
                   
   name,
   email,
   password,
   role

                }
            );

            alert(res.data.message);

            // REDIRECT TO LOGIN
            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration failed");

        }

    };

    return (

        <div className="flex justify-center items-center h-[80vh]">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Register
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select
    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
    value={role}
    onChange={(e) => setRole(e.target.value)}
>

    <option value="student">
        Student
    </option>

    <option value="admin">
        Admin
    </option>

</select>
                    <button
                        onClick={handleRegister}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Register;