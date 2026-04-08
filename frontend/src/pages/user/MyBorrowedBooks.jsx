import { useEffect, useState } from "react";
import { getMyBooks } from "../../services/userService";

function MyBorrowedBooks() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        const data = await getMyBooks(userId);
        setBooks(data);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Borrowed Books</h1>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Book</th>
                        <th className="p-3 text-center">Issue Date</th>
                        <th className="p-3 text-center">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id} className="border-b">
                            <td className="p-3">{book.title}</td>
                            <td className="p-3 text-center">{new Date(book.issue_date).toLocaleDateString()}</td>
                            <td className="p-3 text-center">{new Date(book.due_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default MyBorrowedBooks;