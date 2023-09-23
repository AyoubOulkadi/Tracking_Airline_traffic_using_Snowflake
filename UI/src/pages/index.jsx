import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://nextjs-app:5000"; // Replace with your Flask API base URL

const airlineOptions = [
  "JetBlue Airways",
  "Delta Air Lines",
  "Cathay Pacific",
  "ANA - All Nippon Airways",
  "China Eastern Airlines",
  "Etihad Airways",
  "Ryanair",
  "Qatar Airways",
  "Qantas",
  "United Airlines",
  "Alitalia",
  "American Airlines",
  "Emirates",
  "Japan Airlines",
  "Turkish Airlines",
  "Singapore Airlines",
  "Air Canada",
  "Finnair",
  "Virgin Atlantic",
  "Royal Air Maroc",
  "KLM Royal Dutch Airlines",
  "Southwest Airlines",
  "Air France",
  "Lufthansa",
  "British Airways",
  "AirAsia",
];

const seasonOptions = ["Summer", "Spring", "Winter"];

export default function Home() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTotalPages = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_total_pages`, {
        params: filters,
      });
      const { total_pages: total } = response.data; // Assuming the API returns total_pages

      setTotalPages(total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_data`, {
        params: { ...filters, page },
      });
      console.log(response);
      const data = response.data;

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Dropdown component for airline options
  const AirlineDropdown = () => (
    <select
      id="aller_type"
      name="aller_type"
      className="form-input rounded-md px-2 py-1 w-1/2 mx-auto"
      onChange={handleFilterChange}
      value={filters.aller_type || ""}
    >
      <option value="">Select Airline Type</option>
      {airlineOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  // Dropdown component for return options
  const ReturnDropdown = () => (
    <select
      id="return_type"
      name="return_type"
      className="form-input rounded-md px-2 py-1 w-1/2 mx-auto"
      onChange={handleFilterChange}
      value={filters.return_type || ""}
    >
      <option value="">Select Return Type</option>
      {airlineOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  // Dropdown component for season options
  const SeasonDropdown = () => (
    <select
      id="season"
      name="season"
      className="form-input rounded-md px-2 py-1 w-1/2 mx-auto"
      onChange={handleFilterChange}
      value={filters.season || ""}
    >
      <option value="">Select Season</option>
      {seasonOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  // Pagination component with dynamic display
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const displayPages = 10; // Number of pages to display at once
    const pageLinks = [];

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    let endPage = startPage + displayPages - 1;

    // Ensure that the endPage does not exceed the total number of pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - displayPages + 1);
    }

    // Add ellipsis points if there are more pages before or after
    if (startPage > 1) {
      pageLinks.push(
        <button key="start" onClick={() => onPageChange(1)} className="mx-1">
          1
        </button>
      );
      if (startPage > 2) {
        pageLinks.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 ${
            currentPage === i ? "bg-blue-500 px-1 rounded text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageLinks.push(<span key="ellipsis-end">...</span>);
      }
      pageLinks.push(
        <button
          key="end"
          onClick={() => onPageChange(totalPages)}
          className="mx-1"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex justify-center space-x-4 mt-4">{pageLinks}</div>
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold mb-4">Airline Data</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group flex items-center">
              <AirlineDropdown />
            </div>
            <div className="form-group flex items-center">
              <ReturnDropdown />
            </div>
            <div className="form-group flex items-center">
              <input
                type="number"
                id="min_price"
                name="min_price"
                className="form-input rounded-md px-3 py-2 w-1/2 mx-auto"
                placeholder="Min Price"
                onChange={handleFilterChange}
                value={filters.min_price || ""}
              />
            </div>
            <div className="form-group flex items-center">
              <input
                type="number"
                id="max_price"
                name="max_price"
                className="form-input rounded-md px-3 py-2 w-1/2 mx-auto"
                placeholder="Max Price"
                onChange={handleFilterChange}
                value={filters.max_price || ""}
              />
            </div>
            <div className="form-group flex items-center">
              <SeasonDropdown />
            </div>
            <div className="form-group flex items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-1/2 mx-auto"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="table-auto w-full ">
          <thead>
            <tr>
              <th className="px-4 py-2 ">Airline Aller</th>
              <th className="px-4 py-2 ">Airline Retour</th>
              <th className="px-4 py-2 ">Price</th>
              <th className="px-4 py-2 ">Arrivé</th>
              <th className="px-4 py-2 ">Départ</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index} className="even:bg-slate-100">
                <td className="px-4 py-2">{row.AIRLINE_ALLER}</td>
                <td className="px-4 py-2">{row.AIRLINE_RETOUR}</td>
                <td className="px-4 py-2">{row.PRICE}</td>
                <td className="px-4 py-2">{row.HOR_ARRI}</td>
                <td className="px-4 py-2">{row.HOR_DEP}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
