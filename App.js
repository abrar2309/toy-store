import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    username: '',
    salary: '',
    department: '',
    gender: '',
    date_of_birth: '',
    other_attributes: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('http://localhost:3000/employees');
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    const res = await axios.post('http://localhost:3000/employees', newEmployee);
    setEmployees([...employees, res.data]);
    setNewEmployee({
      username: '',
      salary: '',
      department: '',
      gender: '',
      date_of_birth: '',
      other_attributes: '',
    });
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <form onSubmit={addEmployee}>
        <input type="text" placeholder="Username" onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })} />
        <input type="number" placeholder="Salary" onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
        <input type="text" placeholder="Department" onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} />
        <input type="text" placeholder="Gender" onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })} />
        <input type="date" onChange={(e) => setNewEmployee({ ...newEmployee, date_of_birth: e.target.value })} />
        <input type="text" placeholder="Other Attributes" onChange={(e) => setNewEmployee({ ...newEmployee, other_attributes: e.target.value })} />
        <button type="submit">Add Employee</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Other Attributes</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.username}</td>
              <td>{employee.salary}</td>
              <td>{employee.department}</td>
              <td>{employee.gender}</td>
              <td>{employee.date_of_birth}</td>
              <td>{employee.other_attributes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;