import { useEffect, useState } from "react";
import { getBorrowHistory } from "../../services/userService";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function BorrowHistory() {
    const [history, setHistory] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadHistory(); }, []);

    const loadHistory = async () => {
        const data = await getBorrowHistory(userId);
        setHistory(data);
    };

    return (
        <div className="bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                Borrow History
            </h2>

            <div className="h-72 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Book</th>
                            <th className="p-3 text-center">Issue Date</th>
                            <th className="p-3 text-center">Due Date</th>
                            <th className="p-3 text-center">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((book, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">{book.title}</td>
                                <td className="p-3 text-center">{formatDate(book.issue_date)}</td>
                                <td className="p-3 text-center">{formatDate(book.due_date)}</td>
                                <td className="p-3 text-center">{book.return_date ? formatDate(book.return_date) : "Not Returned"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BorrowHistory;