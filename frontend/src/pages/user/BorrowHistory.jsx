import { useEffect, useState } from "react";
import { getBorrowHistory } from "../../services/userService";

function BorrowHistory() {
    const [history, setHistory] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadHistory(); }, []);

    const loadHistory = async () => {
        const data = await getBorrowHistory(userId);
        setHistory(data);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Borrow History</h1>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Book</th>
                        <th className="p-3 text-center">Issue Date</th>
                        <th className="p-3 text-center">Due Date</th>
                        <th className="p-3 text-center">Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((book, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3">{book.title}</td>
                            <td className="p-3 text-center">{new Date(book.issue_date).toLocaleDateString()}</td>
                            <td className="p-3 text-center">{new Date(book.due_date).toLocaleDateString()}</td>
                            <td className="p-3 text-center">{book.return_date ? new Date(book.return_date).toLocaleDateString() : "Not Returned"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BorrowHistory;