import React, { useState, useEffect } from "react";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/patients")
      .then((response) => response.json())
      .then((data) => setPatients(data));
  }, []);

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Medical Condition</th>
            <th>Date of Admission</th>
            <th>Doctor</th>
            <th>Hospital</th>
            <th>Insurance Provider</th>
            <th>Billing Amount</th>
            <th>Room Number</th>
            <th>Admission Type</th>
            <th>Discharge Date</th>
            <th>Medication</th>
            <th>Test Results</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.Name}>
              <td>{patient.Name}</td>
              <td>{patient.Age}</td>
              <td>{patient.Gender}</td>
              <td>{patient.Blood_Type}</td>
              <td>{patient.Medical_Condition}</td>
              <td>{patient.Date_of_Admission}</td>
              <td>{patient.Doctor}</td>
              <td>{patient.Hospital}</td>
              <td>{patient.Insurance_Provider}</td>
              <td>{patient.Billing_Amount}</td>
              <td>{patient.Room_Number}</td>
              <td>{patient.Admission_Type}</td>
              <td>{patient.Discharge_Date}</td>
              <td>{patient.Medication}</td>
              <td>{patient.Test_Results}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDashboard;
