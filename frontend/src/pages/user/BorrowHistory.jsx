import { useEffect, useState } from "react";
import { getBorrowHistory } from "../../services/userService";
import SearchBar from "../../components/common/SearchBar";
import {filterData} from "../../utils/filterData";  

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function BorrowHistory() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadHistory(); }, []);

    const loadHistory = async () => {
        const data = await getBorrowHistory(userId);
        setHistory(data);
    };

    const filteredHistory = filterData(history, search, ["title"]);

    return (
        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    Borrow History
                </h2>

                <SearchBar
                    placeholder="Search books..."
                    value={search}
                    onChange={setSearch}
                />

            </div>

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
                        {filteredHistory.map((book, index) => (
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