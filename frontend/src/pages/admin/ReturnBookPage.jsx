import { useEffect, useState } from "react";
import API from "../../utils/api";
import { returnBook } from "../../services/bookService";
import { toast } from "react-toastify";

function ReturnBookPage() {

    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {
        fetchIssuedBooks();
    }, []);

    const fetchIssuedBooks = async () => {

        const res = await API.get("/issued-books");

        setIssuedBooks(res.data);

    };

    const handleReturn = async (id) => {

        await returnBook(id);

        toast.success("Book returned successfully");

        fetchIssuedBooks();

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Return Book
            </h1>

            <table className="w-full bg-white shadow rounded">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="p-3 text-left">Book</th>
                        <th className="p-3 text-left">User</th>
                        <th className="p-3 text-center">Issue Date</th>
                        <th className="p-3 text-center">Due Date</th>
                        <th className="p-3 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {issuedBooks.map((book) => (

                        <tr key={book.id} className="border-b">

                            <td className="p-3">{book.title}</td>
                            <td className="p-3">{book.user}</td>
                            <td className="p-3 text-center">{book.issue_date}</td>
                            <td className="p-3 text-center">{book.due_date}</td>

                            <td className="p-3 text-center">

                                <button
                                    onClick={() => handleReturn(book.id)}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Return
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReturnBookPage;