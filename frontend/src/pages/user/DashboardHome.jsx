import { useEffect, useState } from "react";
import { getUserDashboard } from "../../services/userService";
import { getRecentBooks, getDueBooks } from "../../services/userService";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function DashboardHome() {

    const [stats, setStats] = useState({
        total_books: 0,
        borrowed: 0,
        history: 0,
        overdue: 0
    });

    const [recentBooks, setRecentBooks] = useState([]);
    const [dueBooks, setDueBooks] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const userId = localStorage.getItem("userId");
        const data = await getUserDashboard(userId);
        setStats(data);
        const recent = await getRecentBooks(userId);
        setRecentBooks(recent);
        const due = await getDueBooks(userId);
        setDueBooks(due);
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

            <div className="grid grid-cols-2 gap-6 mt-10">

                <div className="bg-white rounded-xl shadow">

                    <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                        Recently Borrowed Books
                    </h2>

                    <div className="h-72 overflow-y-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="p-3">Book</th>
                                    <th className="p-3">Issue Date</th>
                                    <th className="p-3">Due Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentBooks.map((book, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3">{book.title}</td>
                                        <td className="p-3">{formatDate(book.issue_date)}</td>
                                        <td className="p-3">{formatDate(book.due_date)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow">

                    <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                        Upcoming Due Books
                    </h2>

                    <div className="h-72 overflow-y-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="p-3">Book</th>
                                    <th className="p-3">Due Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dueBooks.map((book, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3">{book.title}</td>
                                        <td className="p-3">{formatDate(book.due_date)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>



    );

}

export default DashboardHome;