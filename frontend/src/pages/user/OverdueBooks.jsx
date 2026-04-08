import { useEffect, useState } from "react";
import { getOverdueBooks, payFine } from "../../services/userService";
import { toast } from "react-toastify";

function OverdueBooks() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const data = await getOverdueBooks(userId);
        setBooks(data);
    };

    const handlePay = async (id) => {
        await payFine(id);
        toast.success("Fine paid successfully");
        loadBooks();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Overdue Books</h1>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Book</th>
                        <th className="p-3 text-center">Due Date</th>
                        <th className="p-3 text-center">Overdue Days</th>
                        <th className="p-3 text-center">Fine</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
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
    );
}

export default OverdueBooks;