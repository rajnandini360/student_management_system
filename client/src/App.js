import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  // GET students
  const loadStudents = () => {
    axios.get("http://localhost:5000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ADD student
  const addStudent = () => {
    if (!name || !email || !course) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/students", {
      name,
      email,
      course
    }).then(() => {
      setName("");
      setEmail("");
      setCourse("");
      loadStudents();
    });
  };

  // DELETE student
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => loadStudents())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>

      {/* FORM */}
      <div className="form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                <button className="delete" onClick={() => deleteStudent(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;