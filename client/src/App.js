import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoutes";
function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">

        {/* NAVBAR */}
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-indigo-700">
            🎓 Student Management System
          </h1>

          <div className="flex gap-4">

            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>

          </div>

        </nav>


        {/* ROUTES */}
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;