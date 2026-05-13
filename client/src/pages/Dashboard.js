import { useEffect, useState } from "react";

import axios from "axios";

function Dashboard() {
    const role = localStorage.getItem("role");
    const [students, setStudents] = useState([]);

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

        <div className="p-10">

            <h1 className="text-4xl font-bold text-indigo-700 mb-8">
                🎓 Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-6">
   Logged in as: <b>{role}</b>
</p>
            {/* CARDS */}
            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-indigo-600">
                        {totalStudents}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Total Students
                    </p>

                </div>


                <div className="bg-white p-6 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-green-600">
                        {totalCourses}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Total Courses
                    </p>

                </div>


                <div className="bg-white p-6 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-pink-600">
                        {students.length}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Active Students
                    </p>

                </div>

            </div>


            {/* STUDENT TABLE */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                    Student List
                </h2>

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-indigo-100">

                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Course</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.map((student) => (

                            <tr
                                key={student.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-3">
                                    {student.id}
                                </td>

                                <td className="p-3">
                                    {student.name}
                                </td>

                                <td className="p-3">
                                    {student.email}
                                </td>

                                <td className="p-3">
                                    {student.course}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Dashboard;