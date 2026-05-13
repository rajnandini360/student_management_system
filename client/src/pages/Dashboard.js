import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

    const role = localStorage.getItem("role");

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
     const [editId, setEditId] = useState(null);
    const navigate = useNavigate();


    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

    };


    // FETCH STUDENTS
    const loadStudents = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/students",
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );

            setStudents(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ADD STUDENT
    const addStudent = async () => {

        try {

            await axios.post(
                "http://localhost:5000/students",
                {
                    name,
                    email,
                    course
                }
            );

            // CLEAR FORM
            setName("");
            setEmail("");
            setCourse("");

            // RELOAD STUDENTS
            loadStudents();

        } catch (error) {

            console.log(error);

        }

    };


    // DELETE STUDENT
    const deleteStudent = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/students/${id}`
            );

            // REFRESH TABLE
            loadStudents();

        } catch (error) {

            console.log(error);

        }

    };
const handleEdit = (student) => {

    setEditId(student.id);

    setName(student.name);

    setEmail(student.email);

    setCourse(student.course);

};
const updateStudent = async () => {

    try {

        await axios.put(
            `http://localhost:5000/students/${editId}`,
            {
                name,
                email,
                course
            }
        );

        // CLEAR FORM
        setName("");
        setEmail("");
        setCourse("");

        // RESET EDIT MODE
        setEditId(null);

        // REFRESH STUDENTS
        loadStudents();

    } catch (error) {

        console.log(error);

    }

};

    useEffect(() => {

        loadStudents();

    }, []);


    // TOTAL STUDENTS
    const totalStudents = students.length;


    // UNIQUE COURSES
    const totalCourses = [
        ...new Set(students.map((s) => s.course))
    ].length;


    return (

        <div className="p-10 min-h-screen bg-indigo-100">


            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-indigo-700">
                    🎓 Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-lg transition"
                >
                    Logout
                </button>

            </div>


            {/* ROLE */}
            <p className="text-lg text-gray-700 mb-6">
                Logged in as: <b>{role}</b>
            </p>


            {/* ADMIN ADD STUDENT FORM */}
            {
                role === "admin" && (

                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

                        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                            Add Student
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <input
                                type="text"
                                placeholder="Student Name"
                                className="border p-3 rounded-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="Student Email"
                                className="border p-3 rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Course"
                                className="border p-3 rounded-lg"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />

                        </div>

                       <button
    onClick={
        editId
            ? updateStudent
            : addStudent
    }
    className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
>
    {
        editId
            ? "Update Student"
            : "Add Student"
    }
</button>

                    </div>

                )
            }


            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


                {/* TOTAL STUDENTS */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

                    <h2 className="text-4xl font-bold text-indigo-600">
                        {totalStudents}
                    </h2>

                    <p className="text-gray-600 mt-2 text-lg">
                        Total Students
                    </p>

                </div>


                {/* TOTAL COURSES */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

                    <h2 className="text-4xl font-bold text-green-600">
                        {totalCourses}
                    </h2>

                    <p className="text-gray-600 mt-2 text-lg">
                        Total Courses
                    </p>

                </div>


                {/* ACTIVE STUDENTS */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

                    <h2 className="text-4xl font-bold text-pink-600">
                        {students.length}
                    </h2>

                    <p className="text-gray-600 mt-2 text-lg">
                        Active Students
                    </p>

                </div>

            </div>


            {/* STUDENT TABLE */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold mb-6 text-indigo-700">
                    Student List
                </h2>


                <div className="overflow-x-auto">

                    <table className="w-full border-collapse overflow-hidden rounded-xl">

                        <thead>

                            <tr className="bg-indigo-200 text-indigo-900">

                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Course</th>

                                {
                                    role === "admin" && (
                                        <th className="p-4 text-left">
                                            Actions
                                        </th>
                                    )
                                }

                            </tr>

                        </thead>


                        <tbody>

                            {students.map((student) => (

                                <tr
                                    key={student.id}
                                    className="border-b hover:bg-indigo-50 transition"
                                >

                                    <td className="p-4">
                                        {student.id}
                                    </td>

                                    <td className="p-4">
                                        {student.name}
                                    </td>

                                    <td className="p-4">
                                        {student.email}
                                    </td>

                                    <td className="p-4">
                                        {student.course}
                                    </td>


                                    {
                                        role === "admin" && (

                                            <td className="p-4">

                                                <td className="p-4 flex gap-3">

    <button
        onClick={() => handleEdit(student)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
    >
        Edit
    </button>

    <button
        onClick={() => deleteStudent(student.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
        Delete
    </button>

</td>

                                            </td>

                                        )
                                    }

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;