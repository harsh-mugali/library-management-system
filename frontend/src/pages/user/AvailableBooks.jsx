import { useEffect, useState } from "react";
import { getAvailableBooks, borrowBook } from "../../services/userService";
import { toast } from "react-toastify";

function AvailableBooks() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const data = await getAvailableBooks();
        setBooks(data);
    };

    const handleBorrow = async (bookId) => {
        await borrowBook({ book_id: bookId, user_id: userId });
        toast.success("Book borrowed");
        loadBooks();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Available Books</h1>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Author</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-center">Copies</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id} className="border-b">
                            <td className="p-3">{book.title}</td>
                            <td className="p-3">{book.author}</td>
                            <td className="p-3">{book.category}</td>
                            <td className="p-3 text-center">{book.total_copies}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default AvailableBooks;