import { useEffect, useState } from "react";
import { getUserDashboard } from "../../services/userService";

function DashboardHome() {

    const [stats, setStats] = useState({
        total_books: 0,
        borrowed: 0,
        history: 0,
        overdue: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const userId = localStorage.getItem("userId");
        const data = await getUserDashboard(userId);
        setStats(data);
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-6 rounded-xl">
                    <p>Total Books</p>
                    <h2 className="text-3xl font-bold">{stats.total_books}</h2>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-xl">
                    <p>My Borrowed Books</p>
                    <h2 className="text-3xl font-bold">{stats.borrowed}</h2>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <p>Total Borrowed</p>
                    <h2 className="text-3xl font-bold">{stats.history}</h2>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl">
                    <p>Overdue Books</p>
                    <h2 className="text-3xl font-bold">{stats.overdue}</h2>
                </div>

            </div>

        </div>

    );

}

export default DashboardHome;