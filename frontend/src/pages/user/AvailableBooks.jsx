import { useEffect, useState } from "react";
import { getAvailableBooks } from "../../services/userService";
import { toast } from "react-toastify";

function AvailableBooks() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const data = await getAvailableBooks();
        setBooks(data);
    };

    return (
        <div className="bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                Available Books
            </h2>

            <div className="h-80 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3 text-center">Author</th>
                            <th className="p-3 text-center">Category</th>
                            <th className="p-3 text-center">Copies</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="border-b">
                                <td className="p-3">{book.title}</td>
                                <td className="p-3 text-center">{book.author}</td>
                                <td className="p-3 text-center">{book.category}</td>
                                <td className="p-3 text-center">{book.total_copies}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}
export default AvailableBooks;