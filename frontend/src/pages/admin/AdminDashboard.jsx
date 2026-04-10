import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import StatsCards from "../../components/dashboard/StatsCards";
import IssuedChart from "../../components/dashboard/IssuedChart";
import { getDashboardStats } from "../../services/dashboardService";
import AddBookPage from "./AddBookPage";
import BooksPage from "./BooksPage";
import AssignBookPage from "./AssignBookPage";
import ReturnBookPage from "./ReturnBookPage";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { getRecentActivity } from "../../services/dashboardService";
import TopBooks from "../../components/dashboard/TopBooks";
import { getTopBooks } from "../../services/dashboardService";
import UsersPage from "./UsersPage";
import AdminProfile from "../../components/layout/AdminProfile";
import CategoryPage from "./CategoryPage";
import OverduePage from "./OverduePage";
import FineHistoryPage from "./FineHistoryPage";
import { exportData } from "../../utils/exportCSV";
import API from "../../utils/api";

function AdminDashboard() {

  const [activePage, setActivePage] = useState("dashboard");

  const [stats, setStats] = useState({
    total_books: 0,
    total_users: 0,
    issued_books: 0,
    returned_books: 0
  });

  const [chartData, setChartData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {

    const statsData = await getDashboardStats();

    setStats(statsData);

    setChartData([
      { name: "Issued", value: statsData.issued_books },
      { name: "Returned", value: statsData.returned_books }
    ]);
    const activityData = await getRecentActivity();
    setActivities(activityData);
    const topBooksData = await getTopBooks();
    setTopBooks(topBooksData);

  };

  const exportUsers = async (type) => {
    const res = await API.get("/export-users");
    exportData(res.data, "users_report", type);
  };

  const exportIssuedBooks = async (type) => {
    const res = await API.get("/export-issued-books");
    exportData(res.data, "issued_books_report", type);
  };

  const exportOverdueBooks = async (type) => {
    const res = await API.get("/export-overdue-books");
    exportData(res.data, "overdue_books_report", type);
  };

  const exportFines = async (type) => {
    const res = await API.get("/export-fines");
    exportData(res.data, "fines_report", type);
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar setActivePage={setActivePage} />

      <div className="flex-1 p-8">

        {/* Dashboard Page */}

        {activePage === "dashboard" && (

          <>

            <div className="flex justify-between items-center mb-8">

              <h1 className="text-3xl font-bold">Dashboard</h1>

              <div className="flex items-center gap-4">

                <div className="relative">

                  <button
                    onClick={() => setShowExport(!showExport)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                  >
                    Export Report
                  </button>

                  {showExport && (

                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50">

                      <p className="px-4 py-2 text-gray-500 text-sm">Users</p>

                      <button onClick={() => exportUsers("csv")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">CSV</button>
                      <button onClick={() => exportUsers("excel")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Excel</button>
                      <button onClick={() => exportUsers("pdf")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">PDF</button>

                      <hr />

                      <p className="px-4 py-2 text-gray-500 text-sm">Issued Books</p>

                      <button onClick={() => exportIssuedBooks("csv")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">CSV</button>
                      <button onClick={() => exportIssuedBooks("excel")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Excel</button>
                      <button onClick={() => exportIssuedBooks("pdf")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">PDF</button>

                      <hr />

                      <p className="px-4 py-2 text-gray-500 text-sm">Overdue Books</p>

                      <button onClick={() => exportOverdueBooks("csv")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">CSV</button>
                      <button onClick={() => exportOverdueBooks("excel")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Excel</button>
                      <button onClick={() => exportOverdueBooks("pdf")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">PDF</button>

                      <hr />

                      <p className="px-4 py-2 text-gray-500 text-sm">Fines</p>

                      <button onClick={() => exportFines("csv")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">CSV</button>
                      <button onClick={() => exportFines("excel")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Excel</button>
                      <button onClick={() => exportFines("pdf")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">PDF</button>

                    </div>

                  )}

                </div>

                <AdminProfile />

              </div>

            </div>

            <StatsCards stats={stats} />

            <div className="grid grid-cols-2 gap-6">

              <IssuedChart chartData={chartData} />
              <RecentActivity activities={activities} />
            </div>

            <div className="mt-6">

              <TopBooks books={topBooks} />

            </div>

          </>

        )}

        {/* Books Page */}

        {activePage === "books" && <BooksPage />}

        {/* Add Book Page */}

        {activePage === "addBook" && <AddBookPage />}

        {/* Assign Book Page */}

        {activePage === "assignBook" && <AssignBookPage />}

        {/* Return Book Page */}

        {activePage === "returnBook" && <ReturnBookPage />}

        {/* Users Page */}

        {activePage === "users" && <UsersPage />}

        {/* category page */}

        {activePage === "category" && <CategoryPage />}

        {/* Overdue Books Page */}

        {activePage === "overdue" && <OverduePage />}

        {/* Fine History Page */}

        {activePage === "fineHistory" && <FineHistoryPage />}

      </div>

    </div >

  );

}

export default AdminDashboard;