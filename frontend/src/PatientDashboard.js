import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import "./index.css";

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchColumns, setSearchColumns] = useState([
    { value: "Name", label: "Name" },
  ]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 100;

  const backendUrl =
    "https://m92nc6tvoe.execute-api.us-east-2.amazonaws.com/Prod";

  // Column names mapping
  const headers = [
    { display: "Name", api: "Name" },
    { display: "Age", api: "Age" },
    { display: "Gender", api: "Gender" },
    { display: "Blood Type", api: "Blood_Type" },
    { display: "Medical Condition", api: "Medical_Condition" },
    { display: "Date of Admission", api: "Date_of_Admission" },
    { display: "Doctor", api: "Doctor" },
    { display: "Hospital", api: "Hospital" },
    { display: "Insurance Provider", api: "Insurance_Provider" },
    { display: "Billing Amount", api: "Billing_Amount" },
    { display: "Room Number", api: "Room_Number" },
    { display: "Admission Type", api: "Admission_Type" },
    { display: "Discharge Date", api: "Discharge_Date" },
    { display: "Medication", api: "Medication" },
    { display: "Test Results", api: "Test_Results" },
  ];
  const cellClass = "py-3 px-6 text-left whitespace-nowrap";

  const columnOptions = headers.map((header) => ({
    value: header.api,
    label: header.display,
  }));

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  const fetchPatients = (page) => {
    setLoading(true);
    fetch(`${backendUrl}/patients?page=${page}&size=${pageSize}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPatients(data.data);
        setFilteredPatients(filterPatients(search, searchColumns, data.data));
        setTotal(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  };

  const filterPatients = (query, columns, patientsList) => {
    if (query === "") {
      return patientsList;
    } else {
      return patientsList.filter((patient) =>
        columns.some((column) => {
          const fieldValue = String(patient[column.value]).toLowerCase();
          if (column.value === "Gender" || column.value === "Blood_Type") {
            return fieldValue === query.toLowerCase();
          }
          return fieldValue.includes(query.toLowerCase());
        })
      );
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    setFilteredPatients(filterPatients(query, searchColumns, patients));
  };

  const handleColumnChange = (selectedOptions) => {
    setSearchColumns(selectedOptions || []);
    setFilteredPatients(
      filterPatients(search, selectedOptions || [], patients)
    );
  };

  const handleNextPage = () => {
    if (page * pageSize < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
      <div className="mb-4 flex justify-between items-center">
        <div className="relative flex-grow mr-4">
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
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Search in columns:</h3>
        <Select
          isMulti
          value={searchColumns}
          onChange={handleColumnChange}
          options={columnOptions}
          className="w-full"
        />
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
            <ClipLoader size={50} color={"#007AC2"} loading={loading} />
          </div>
        )}
        <div
          className={`overflow-x-auto max-h-[calc(100vh-20rem)] overflow-auto mb-4 ${
            loading ? "opacity-50" : ""
          }`}
        >
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead className="sticky top-0 bg-white">
              <tr
                className="uppercase text-sm leading-normal"
                style={{ backgroundColor: "#007AC2", color: "white" }}
              >
                {headers.map((header) => (
                  <th key={header.api} className={cellClass}>
                    {header.display}
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
                  {headers.map((header, i) => (
                    <td key={i} className={cellClass}>
                      {patient[header.api]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page * pageSize >= total}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
