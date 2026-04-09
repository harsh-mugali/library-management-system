import { useEffect, useState } from "react";
import { getOverdueBooks, payFine } from "../../services/userService";
import { toast } from "react-toastify";
import SearchBar from "../../components/common/SearchBar";
import {filterData} from "../../utils/filterData";

function OverdueBooks() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const data = await getOverdueBooks(userId);
        setBooks(data);
    };

    const filteredBooks = filterData(books, search, ["title"]);

    const handlePay = async (id) => {
        await payFine(id);
        toast.success("Fine paid successfully");
        loadBooks();
    };

    return (
        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    Overdue Books
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
                            <th className="p-3 text-center">Due Date</th>
                            <th className="p-3 text-center">Overdue Days</th>
                            <th className="p-3 text-center">Fine</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBooks.map(book => (
                            <tr key={book.id} className="border-b">
                                <td className="p-3">{book.title}</td>
                                <td className="p-3 text-center">{new Date(book.due_date).toLocaleDateString()}</td>
                                <td className="p-3 text-center text-red-600 font-semibold">{book.overdue_days}</td>
                                <td className="p-3 text-center font-semibold text-red-600">₹{book.amount}</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => handlePay(book.id)} className="bg-red-500 text-white px-3 py-1 rounded">Pay Fine</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OverdueBooks;