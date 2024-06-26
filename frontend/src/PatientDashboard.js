import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const headers = [
    "Name",
    "Age",
    "Gender",
    "Blood Type",
    "Medical Condition",
    "Date of Admission",
    "Doctor",
    "Hospital",
    "Insurance Provider",
    "Billing Amount",
    "Room Number",
    "Admission Type",
    "Discharge Date",
    "Medication",
    "Test Results",
  ];
  const cellClass = "py-3 px-6 text-left whitespace-nowrap";

  useEffect(() => {
    fetch(
      "https://m92nc6tvoe.execute-api.us-east-2.amazonaws.com/Prod/patients"
    )
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          Object.values(patient).some((value) =>
            String(value).toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      );
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#007AC2" }}
      >
        Patient Dashboard
      </h1>
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <FaSearch className="text-gray-500" />
        </span>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
          style={{ borderColor: "#007AC2", outlineColor: "#007AC2" }}
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto max-h-[calc(100vh-10rem)] overflow-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead>
              <tr
                className="uppercase text-sm leading-normal"
                style={{ backgroundColor: "#007AC2", color: "white" }}
              >
                {headers.map((header) => (
                  <th key={header} className={cellClass}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.Name}
                  className="border-b border-gray-200 hover:bg-gray-100 hover-highlight"
                >
                  {Object.values(patient).map((value, i) => (
                    <td key={i} className={cellClass}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
