import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

function OverduePage() {

    const [books, setBooks] = useState([]);
    const [totalFine, setTotalFine] = useState(0);

    useEffect(() => {
        fetchOverdue();
        fetchFine();
    }, []);

    const fetchOverdue = async () => {
        const res = await API.get("/overdue-books");
        setBooks(res.data);
    };

    const fetchFine = async () => {
        const res = await API.get("/total-fine");
        setTotalFine(res.data.total_fine);
    };

    const applyFine = async (id) => {
        await API.post(`/apply-fine/${id}`);
        toast.success("Fine applied");
        fetchFine();
    };

    return (
        <div className="bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                Overdue Books
            </h2>

            <div className="mb-4 text-lg font-semibold sticky top-0 bg-gray-100 z-10 p-3 rounded">
                Total Fine Collected: ₹{totalFine}
            </div>

            <div className="h-80 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Book</th>
                            <th className="p-3">User</th>
                            <th className="p-3 text-center">Due Date</th>
                            <th className="p-3 text-center">Overdue Days</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {books.map(book => (
                            <tr key={book.id} className="border-b">
                                <td className="p-3">{book.title}</td>
                                <td className="p-3">{book.user}</td>
                                <td className="p-3 text-center">{new Date(book.due_date).toLocaleDateString()}</td>
                                <td className="p-3 text-center text-red-600 font-semibold">{book.overdue_days}</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => applyFine(book.id)} className="bg-red-500 text-white px-3 py-1 rounded">Fine</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OverduePage;