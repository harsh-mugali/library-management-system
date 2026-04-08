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

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar setActivePage={setActivePage} />

      <div className="flex-1 p-8">

        {/* Dashboard Page */}

        {activePage === "dashboard" && (

          <>

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <AdminProfile />
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

      </div>

    </div >

  );

}

export default AdminDashboard;